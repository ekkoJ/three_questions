


$(function(){

    var winh = $(window).height();
    $(window).on('resize',function(){
        winh = $(window).height();
        $('.wrapper').height(winh);
    });
    $('.wrapper').height(winh);


    var quesBox = $('.quesBox');
    var correct1 = $('.correct1');
    var index = 0;
    var nextIndex = 0;
    var trashNum = 0;
    var wrongAnswer = 0;
    var correctAnswer = 0;
    var XmouseMove,YmouseMove,currentX,currentY,thisLeft,thisTop;
    var recX,recY,recW,recH,winw,correct1W,correct1H,rangeArrX,rangeArrY,currentMouseX,currentMouseY;//方法1漂浮需要的变量
    var mouseMove_flag = false;
    var intrash_flag = false;
    var trashTime_flag = true;
    var wrongMove_flag = false;
    var ques2Move_flag = false;
    var ques2MoveBridge_flag = false;
    var ques3cupMove_flag = false;
    var ques3cupMoving_flag = false;
    var ques3Sucess_flag = false;
    var mouseMoveX,mouseMoveY,leftOffset,topOffset,$this,trashX,trashY,trashHeight,trashWidth,trashTimer;


    correct1.on('mousedown',function(e){ //正确答案点击

        currentMouseX = e.clientX;
        currentMouseY = e.clientY;
        leftOffset = currentMouseX - $(this).offset().left;
        topOffset = currentMouseY - $(this).offset().top;
        $(this).addClass('float');
        // mouseCurrentPosition(e);
        correctFloat(currentMouseX,currentMouseY);
        if(trashTime_flag){
                trashTime_flag = false;
                setTimeout(function(){
                    $('.trashBox').removeClass('disnone');
                    TweenMax.to('.trashBox',0.5,{autoAlpha:1});
                },2000);
        }
    });

//问题1--错误拖拽
    $('.textWrongs').on('mousedown',function(e){ //其他答案点击
        mouseMove_flag = true;
        leftOffset = e.pageX - $(this).offset().left;
        topOffset = e.pageY - $(this).offset().top;
        $this = $(this);

        trashX = $('.trashBox').offset().left;
        trashY = $('.trashBox').offset().top;
        trashHeight = $('.trashBox').height();
        trashWidth = $('.trashBox').width();


    });
//问题2桥梁
    $('.bridge2').on('mousedown',function(e){//问题2桥梁拖拽点击开始
        ques2Move_flag = true;
        currentX = e.pageX;
        currentY = e.pageY;
        thisLeft = parseInt($(this).css('left'));
        thisTop = parseInt($(this).css('top'));


        $this = $(this);

    });

    //question3 cups
    $('.cup').on('mousedown',function(e){
        ques3cupMove_flag = true;
        currentY = e.pageY;
        thisTop = parseInt($(this).css('top'));
        $this = $(this);
    });
    // $('.cup').on('mousemove',function(e){
    //
    // });

    $(window).on('mousemove',function(e){
        //问题1鼠标拖动
        if(mouseMove_flag){
            wrongMove_flag = true;
            if(wrongMove_flag){
                $this.addClass('float');
                mouseMoveX = e.pageX - leftOffset;
                mouseMoveY = e.pageY - topOffset;
                TweenMax.set($this,{top:mouseMoveY,left:mouseMoveX});

                //垃圾桶范围内
                $('.trashBox').removeClass('disnone');
                TweenMax.to('.trashBox',0.5,{autoAlpha:1});
                trashX = $('.trashBox').offset().left;
                trashY = $('.trashBox').offset().top;
                trashHeight = $('.trashBox').height();
                trashWidth = $('.trashBox').width();
                if(mouseMoveX + ($this.width() * 0.85) > trashX){
                    if(mouseMoveY < trashY + trashHeight && mouseMoveY + $this.height() > trashY){
                        $('.trashBox').addClass('openTrash');
                        intrash_flag = true;
                    }else{
                        $('.trashBox').removeClass('openTrash');
                        intrash_flag = false;
                    }
                }else{
                        $('.trashBox').removeClass('openTrash');
                        intrash_flag = false;
                }
            }

        }

        //问题2鼠标拖动
        if(ques2Move_flag){
            ques2MoveBridge_flag = true;

            leftOffset = e.pageX - currentX;
            topOffset = e.pageY - currentY;

            mouseMoveX = thisLeft + leftOffset +'px';
            mouseMoveY = thisTop + topOffset +'px';

            if(mouseMoveY <= '0px'){
                TweenMax.set($this,{top:0,bottom:'auto'});
            }else{
                TweenMax.set($this,{top:mouseMoveY,bottom:'auto'});

            }

        }

        //question3cup move
        if(ques3cupMove_flag){
            ques3cupMoving_flag =true;
            topOffset = e.pageY - currentY;
            if(topOffset >= 0){
                topOffset = 0;
            }else if(topOffset <= -($this.parent().find('.balls').height())){
                topOffset = -($this.parent().find('.balls').height());
            }else{
                topOffset = e.pageY - currentY;
            }

            if($this.parent().find('.balls').hasClass('red') && topOffset <= -($this.parent().find('.balls').height())/2){
                ques3Sucess_flag = true;
            }
            TweenMax.set($this,{y:topOffset});
        }

    });

    $(window).on('mouseup',function(e){
        if(mouseMove_flag){  //question1
            if(wrongMove_flag){
                if(intrash_flag){
                    TweenMax.to($this,0.2,{
                        top:trashY,
                        left:trashX,
                        scale:0.2,
                        autoAlpha:0,
                        onComplete:function(){
                            $this.addClass('disnone');
                            ++trashNum;
                            if(trashNum>=2){
                                firstQuestionSuccess();
                            }
                        }
                    });

                }else{
                    $this.removeClass('float').attr('style','');
                }
                $('.trashBox').removeClass('openTrash');
                wrongMove_flag = false;
            }else{//错误弹出框
                $('.blackframe,.wrongFrameBox').removeClass('disnone');
            }
            mouseMove_flag = false;
        }

        if(ques2Move_flag){  //question2
            if(ques2MoveBridge_flag){
                if(parseInt(mouseMoveY) <= $('.bridge').height()/2){
                    TweenMax.set($this,{top:0,left:'50%',bottom:'auto',onComplete:function(){
                        successM_flag = true;
                        if(successR_flag && successS_flag && successM_flag){
                            secondSuccess();
                        }
                    }});
                }else{
                    TweenMax.set($this,{top:'auto',left:'50%',bottom:'-120%'});

                }
                ques2MoveBridge_flag= false;
            }
            ques2Move_flag = false;
        }

        if(ques3cupMove_flag){  //question3
            if(ques3cupMoving_flag){
                TweenMax.to($this,0.3,{y:0});
                ques3cupMove_flag = false;
                ques3cupMoving_flag = false;
                if(ques3Sucess_flag){
                    alldone();
                }
            }
        }
    });

    //错误弹出框
    $('.notsure').on('click',function(){
        $('.blackframe,.wrongFrameBox').addClass('disnone');
        if(trashTime_flag){
            trashTime_flag = false;
            setTimeout(function(){
                $('.trashBox').removeClass('disnone');
                TweenMax.to('.trashBox',0.5,{autoAlpha:1});
            },2000);
        }
    });

    $('.sureTogo').on('click',function(){
        $('.areyousure').addClass('disnone');
        $('.sure').removeClass('disnone');
        setTimeout(function(){
            $('.blackframe,.wrongFrameBox,.trashBox').addClass('disnone');
            firstPass(wrongAnswer);
        },1000);
    });


    //问题2点击事件
    var bridgeIcon = $('.bridge2');
    var successR_flag = false,successS_flag = false,successM_flag = false;
    var randomText = 0;
    var textTimer;
    var textConfig = [
        "Why you touch me?Just do it~",
        "What's the matter with you?",
        "Why you click me?",
        "nononononono!Not here~",
        "Why can't you do such a easy job? Just move it~",
    ];
    $('.rotateBtn').on('click',function(){
            TweenMax.to(bridgeIcon,0.5,{
                rotation:360,
                ease:Back.easeOut,
                onComplete:function(){
                    if(successR_flag && successS_flag && successM_flag){
                        secondSuccess(correctAnswer);
                    }
                }
            });
            successR_flag = true;
    });
    $('.scaleBtn').on('click',function(){
            TweenMax.to(bridgeIcon,0.5,{
                scale:1,
                ease:Back.easeOut,
                onComplete:function(){
                    if(successR_flag && successS_flag && successM_flag){
                        secondSuccess(correctAnswer);
                    }
                }
            });
            successS_flag = true;
    });
    $('.moveBtn').on('click',function(){//随机文字出现
        clearTimeout(textTimer);
        $('.message').removeClass('disnone');
        randomText = parseInt(Math.random() * textConfig.length);
        $('.message h1').text(textConfig[randomText]);
        TweenMax.fromTo('.message',0.3,{autoAlpha:0},{
            autoAlpha:1,
            onComplete:function(){
                textTimer = setTimeout(function(){
                    TweenMax.to('.message',0.5,{
                        autoAlpha:0,
                        onComplete:function(){
                            $('.message').addClass('disnone');
                        }
                    });
                },1000);
            }
        });

    });

    //question3's click
    var thisTextIndex = 0;
    var redIndex = 0;
    var cupMove_flag = true;
    $('.question3 .cupTexts').on('click',function(){
        if(cupMove_flag){
            cupMove_flag = false;
            thisTextIndex = $('.question3 .cupTexts').index(this);
            $('.answerBox').removeClass('ani');

            do{
                redIndex = parseInt(Math.random()*3);
            }while( redIndex === thisTextIndex);

            $('.balls').removeClass('red');
            $('.balls').eq(redIndex).addClass('red');

            TweenMax.to($('.cup').eq(thisTextIndex),0.3,{y:'-50%',onComplete:function(){
                TweenMax.to(
                    $('.cup').eq(thisTextIndex),
                    0.3,
                    {
                        y:'0%',
                        delay:0.5,
                        onComplete:function(){
                            $('.cup').attr('style','');
                            $('.answerBox').addClass('ani');

                            cupMove_flag = true;
                            $('.q3wrong,.blackframe').removeClass('disnone');
                            setTimeout(function(){
                                $('.q3wrong,.blackframe').addClass('disnone');
                                $('.answerBox').removeClass('ani');
                            },5000);
                        }
                    });
            }});


        }

    });



    //问题1——随机漂浮方法
    function correctFloat(MouseX,MouseY){

        rangeArrX = getAvailableRangeX();
        rangeArrY = getAvailableRangeY();

        mouseCurrentPositionX(MouseX,MouseY,rangeArrX);

    }
    function mouseCurrentPositionX(MouseX,MouseY,rangeArrX){ //将随机取得的X,Y赋给correct1
        recW = $('.question1 .questionBox').width();
        recH = $('.question1 .questionBox').height();
        correct1W = parseInt($('.correct1').width());
        correct1H = parseInt($('.correct1').height());
        MouseX = getRadom(MouseX,rangeArrX,leftOffset);
        MouseY = getRadom(MouseY,rangeArrY,topOffset);

        TweenMax.to('.correct1',0.3,{left:MouseX,top:MouseY});
    }
    function getRadom(MousePosition,rangeArray,ranges){ //从下面的取值范围中随机取值

        var xlength = rangeArray.length;
        var xindex = parseInt(Math.random() * xlength);


        // do{
        //     xindex = parseInt(Math.random() * xlength);
        // }while(rangeArray[xindex] < MousePosition - ranges/2 || rangeArray[xindex] > MousePosition + ranges/2);
        while(rangeArray[xindex] >= MousePosition - ranges && rangeArray[xindex] <= MousePosition + ranges){
            xindex = parseInt(Math.random() * xlength);
        }
        return rangeArray[xindex];

    }
    function getAvailableRangeX(){ //X取值范围
        recX = $('.question1 .questionBox').offset().left;
        recW = $('.question1 .questionBox').width();
        winw = $(window).width();
        winh = $(window).height();
        correct1W = $('.correct1').width();
        var rangeArr = [];
        for(i=0;i <= winw - correct1W -80;++i){
            if(i+correct1W < recX || i > recX + recW){
                rangeArr.push(i);
            }
        }
        return rangeArr;
    }
    function getAvailableRangeY(){  //y取值范围
        recY = $('.question1 .questionBox').offset().top;
        recH = $('.question1 .questionBox').height();
        winw = $(window).width();
        winh = $(window).height();
        correct1H = $('.correct1').height();
        var rangeArr2 = [];
        for(i=0;i<=winh - correct1H;++i){
            if(i+correct1H < recY || i > recY + recH){
                rangeArr2.push(i);
            }
        }
        return rangeArr2;
    }


    //问题1--成功
    function firstQuestionSuccess(){
        ++correctAnswer;
        $('.corr1,.blackframe').removeClass('disnone');
        setTimeout(function(){
            TweenMax.to('.corr1,.blackframe',0.3,{
                autoAlpha:0,
                onComplete:function(){
                    $('.corr1,.blackframe').addClass('disnone').attr('style','');
                    toQuestion2();
                }
            });

        },1000);


    }
    //问题1——失败
    function firstPass(wrongAnswer){
        ++wrongAnswer;
        toQuestion2();
    }

    //过度到问题2
    function toQuestion2(){
        var delayTime = 0.3;
        TweenMax.to('.question1 .question',0.5,{marginLeft:'-1000000px',ease:Cubic.easeIn});
        TweenMax.to($('.question1 .answerBox .text').eq(0),0.5,{x:'-10000px',ease:Cubic.easeIn,delay:0.2});
        TweenMax.to($('.question1 .answerBox .text').eq(1),0.5,{x:'-10000px',ease:Cubic.easeIn,delay:0.1});
        TweenMax.to($('.question1 .answerBox .text').eq(2),0.5,{x:'-10000px',ease:Cubic.easeIn,
            delay:0.1,
            onComplete:function(){
                $('.question1').addClass('right');
                $('.question2').removeClass('right');
            }
        });
        TweenMax.to($('.bgBox'),0.5,{x:'-10000px',ease:Cubic.easeIn,delay:0.1});
        TweenMax.to('.trashBox',0.3,{
            autoAlpha:0,
            onComplete:function(){
                $('.trashBox').addClass('disnone');
            }
        });

        //questin2get in
        TweenMax.fromTo('.question2 .question',0.5,{x:1000},{x:0,ease:Back.easeIn,delay:delayTime});
        TweenMax.fromTo('.question2 .bridge',0.5,{x:1000},{x:0,ease:Back.easeIn,delay:delayTime + 0.1});
        TweenMax.fromTo($('.question2 .answerBox .text').eq(0),0.5,{x:1000},{x:0,ease:Back.easeIn,delay:delayTime + 0.3});
        TweenMax.fromTo($('.question2 .answerBox .text').eq(1),0.5,{x:1000},{x:0,ease:Back.easeIn,delay:delayTime + 0.4});
        TweenMax.fromTo($('.question2 .answerBox .text').eq(2),0.5,{x:1000},{x:0,ease:Back.easeIn,delay:delayTime + 0.5,onComplete:function(){
            TweenMax.to('.bridge2',0.5,{scale:0.8,yoyo:true,repeat:1,ease:Cubic.easeOut,delay:0.5,onComplete:function(){
                $('.bridge2,.question2 .answerBox .text,.question2 .question,.question2 .bridge').attr('style','');
            }});
        }});

    }

    function secondSuccess(){
        ++correctAnswer;
        $('.corr2,.blackframe').removeClass('disnone');
        setTimeout(function(){
            TweenMax.to('.corr2,.blackframe',0.3,{
                autoAlpha:0,
                onComplete:function(){
                    $('.corr2,.blackframe').addClass('disnone').attr('style','');
                    toQuestion3(correctAnswer);
                }
            });

        },1500);

    }

    //to question3
    function toQuestion3(){
        TweenMax.to('.question2',0.5,{scale:0,ease:Back.easeIn,onComplete:function(){
            $('.question2').addClass('right');
            $('.question3').removeClass('right');
            TweenMax.fromTo('.question3',0.5,{scale:0},{scale:1,ease:Back.easeOut,onComplete:function(){
                $('.answerBox').addClass('ani');
                setTimeout(function(){
                    $('.answerBox').removeClass('ani');
                },4500);
            }});
        }});
    }


    function alldone(){
        ++correctAnswer;
        $('.corr3,.blackframe').removeClass('disnone');
        console.log(correctAnswer);
    }

});
