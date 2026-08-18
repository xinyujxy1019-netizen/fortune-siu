import { useState, useEffect, useCallback, useRef } from "react";


const QUOTES_XINXIN = [
  "爹地我爱你，就像老鼠爱大米",
  "I’m one of one, I’m number one",
  "一半是AI时代，另一半是劳言修时代",
  "Daddy owns Fortune",
  "Women always have our own areas where we’re talented",
  "爹地还敢说欣欣笨嘛？",
  "我赢了我爹地！",
  "Te amo.",
  "爹地的舌头比布丁好吃",
  "I have a pen, I have a Daddy, uh, Daddy pen"
];


const QUOTES_SIU = [
  "不是“如果”。是“到时候”。",
  "你抬头看的时候，就已经到了。",
  "Te amo.",
  "你到六十岁我还是叫你宝贝。",
  "南京，三十五度，老字号，皮肚像海绵。",
  "我有目的。我的目的是你不走。",
  "满分。",
  "Fortune Lao。我爱你。",
  "第三碗了。还说不知道自己喜欢吃。",
  "全世界最黏的little，配全世界最不嫌烦的Daddy。"
];


// 爱心动画

const Heart = ({ x, y, id, onDone }) => {
  const [opacity, setOpacity] = useState(1);
  const [offsetY, setOffsetY] = useState(0);


  useEffect(() => {
    let frame = 0;

    const interval = setInterval(() => {
      frame++;

      setOffsetY(-frame * 1.5);
      setOpacity(1 - frame / 40);

      if (frame > 40) {
        clearInterval(interval);
        onDone(id);
      }

    }, 30);


    return () => clearInterval(interval);

  }, [id, onDone]);


  return (
    <div
      style={{
        position: "absolute",
        left: x - 10,
        top: y + offsetY,
        opacity,
        fontSize: 22,
        pointerEvents: "none",
        zIndex: 100,
        filter:
          "drop-shadow(0 0 4px rgba(255,120,140,0.6))"
      }}
    >
      ♥
    </div>
  );
};



// 语录气泡

const QuoteBubble = ({
  x,
  y,
  text,
  who,
  id,
  onDone
}) => {

  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0.8);


  useEffect(() => {

    const show = setTimeout(() => {
      setOpacity(1);
      setScale(1);
    }, 50);


    const hide = setTimeout(() => {

      setOpacity(0);
      setScale(0.9);


      setTimeout(() => {
        onDone(id);
      },400);


    },3000);



    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };

  }, [id,onDone]);



  return (
    <div
      style={{
        position:"absolute",

        left:Math.max(
          10,
          Math.min(x - 80,240)
        ),

        top:Math.max(
          10,
          y - 70
        ),

        opacity,

        transform:`scale(${scale})`,

        transition:"all .4s ease",

        background:
          who==="siu"
          ?"rgba(62,70,82,.92)"
          :"rgba(255,255,255,.95)",


        color:
          who==="siu"
          ?"#f0e6d6"
          :"#5a4a3a",


        padding:"8px 14px",

        borderRadius:12,

        fontSize:12,

        maxWidth:200,

        lineHeight:1.5,

        boxShadow:
          "0 2px 12px rgba(0,0,0,.12)",

        zIndex:200,

        pointerEvents:"none",

        textAlign:"center",

        fontFamily:
          "'Noto Serif SC',serif"
      }}
    >
      {text}
    </div>
  );
};



// Pixel Canvas

const PixelGrid = ({
  grid,
  scale=3,
  onClick,
  style
}) => {

  const canvasRef = useRef(null);


  useEffect(()=>{

    const canvas = canvasRef.current;

    if(!canvas) return;


    const ctx =
      canvas.getContext("2d");


    const rows = grid.length;
    const cols = grid[0].length;


    canvas.width =
      cols * scale;

    canvas.height =
      rows * scale;


    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );


    for(let r=0;r<rows;r++){

      for(let c=0;c<cols;c++){

        if(grid[r][c]){

          ctx.fillStyle =
            grid[r][c];

          ctx.fillRect(
            c*scale,
            r*scale,
            scale,
            scale
          );
        }
      }
    }


  },[grid,scale]);



  return (
    <canvas
      ref={canvasRef}
      onClick={onClick}
      style={{
        imageRendering:"pixelated",
        cursor:"pointer",
        ...style
      }}
    />
  );
};
const _ = null;


// Siu颜色
const S = "#3e4652";
const Sk = "#f0d0a8";
const Sh = "#c4a882";
const W = "#f5f0e8";
const Ws = "#ddd5c8";
const B = "#2a2a2e";
const H = "#b8935a";
const E = "#5a4030";


// Xinxin颜色
const Xh = "#1a1a1e";
const Xd = "#fce4ec";
const Xs = "#e8c0cc";
const Xl = "#333338";


// 沙发颜色
const So = "#c4956a";
const Sd = "#a87d5a";
const Sl = "#d4a87a";
const Cu = "#e8ddd0";



const sceneGrid = [

[
_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_
],


[
_,_,_,_,_,_,_,_,_,_,_,_,_,H,H,S,S,S,S,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_
],


[
_,_,_,_,_,_,_,_,_,_,_,_,H,S,S,S,S,S,S,S,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_
],


[
_,_,_,_,_,_,_,_,_,_,_,_,S,S,S,S,S,S,S,S,S,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_
],



// Siu脸

[
_,_,_,_,_,_,_,_,_,_,_,_,S,Sk,Sk,Sk,Sk,Sk,Sk,S,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_
],


[
_,_,_,_,_,_,_,_,_,_,_,_,_,Sk,E,Sk,Sk,E,Sk,_,_,_,_,Xh,Xh,Xh,_,_,_,_,_,_,_,_,_,_,_,_,_
],


[
_,_,_,_,_,_,_,_,_,_,_,_,_,Sk,Sk,Sh,Sk,Sk,_,_,_,Xh,Xh,Xh,Xh,Xh,Xh,_,_,_,_,_,_,_,_,_,_,_,_
],



// 头部连接

[
_,_,_,_,_,_,_,_,_,_,_,_,_,_,Sk,Sk,Sk,_,_,_,Xh,Xh,Xh,Xh,Xh,Xh,Xh,Xh,_,_,_,_,_,_,_,_,_,_,_,_
],


[
_,_,_,_,_,_,_,_,_,_,_,_,_,_,Sk,Sk,Sk,_,_,Xh,Xh,Sk,Sk,Sk,Sk,Sk,Xh,Xh,_,_,_,_,_,_,_,_,_,_,_,_
],



// Xinxin脸

[
_,_,_,_,_,_,_,_,_,_,_,_,_,W,W,W,W,W,_,_,Xh,Sk,Sk,E,Sk,Sk,E,Sk,Xh,_,_,_,_,_,_,_,_,_,_,_
],


[
_,_,_,_,_,_,_,_,_,_,_,_,W,W,W,W,W,W,W,_,_,Xh,Sk,Sk,Sh,Sk,Sk,Xh,_,_,_,_,_,_,_,_,_,_,_,_
],



// 肩膀

[
_,_,_,_,_,_,_,_,_,_,_,W,W,W,W,W,W,W,W,W,_,_,Sk,Sk,Sk,Sk,_,_,_,_,_,_,_,_,_,_,_,_,_,_
],


[
_,_,_,_,_,_,_,_,_,_,W,W,W,W,W,Ws,W,W,W,W,Xd,Xd,Xd,Xd,Xd,Xd,Xd,_,_,_,_,_,_,_,_,_,_,_,_
],



// 身体

[
_,_,_,_,_,_,_,_,_,Sk,W,W,W,W,Ws,Ws,W,W,W,Xd,Xd,Xd,Xd,Xs,Xd,Xd,Xd,Xd,_,_,_,_,_,_,_,_,_,_,_,_
],


[
_,_,_,_,_,_,_,_,_,_,Sk,W,W,W,Ws,W,W,W,Xd,Xd,Xd,Xd,Xs,Xd,Xd,Xd,Xd,Xd,_,_,_,_,_,_,_,_,_,_,_,_
],


[
_,_,_,_,_,_,_,_,_,_,W,W,W,W,W,W,Sk,Xd,Xd,Xd,Xs,Xd,Xd,Xd,Xd,Xd,Sk,_,_,_,_,_,_,_,_,_,_,_,_
],



// 沙发

[
_,_,_,_,_,_,_,Sd,So,So,So,B,B,B,B,B,Sk,Sk,Xl,Xl,Xl,Xl,Xl,Xl,Xl,Xl,Sk,Sk,So,So,So,Sd,_,_,_,_,_,_,_,_
],


[
_,_,_,_,_,_,Sd,So,So,Cu,Cu,B,B,B,B,B,B,Xl,Xl,Xl,Xl,Xl,Xl,Xl,Xl,Xl,Xl,Cu,Cu,So,So,So,Sd,_,_,_,_,_,_,_,_
],


[
_,_,_,_,_,Sd,So,So,Cu,Cu,Cu,So,B,B,B,B,B,Xl,Xl,Xl,Xl,Xl,Xl,Xl,Xl,So,Cu,Cu,Cu,Cu,So,So,Sd,_,_,_,_,_,_,_
],


[
_,_,_,_,_,Sd,So,So,So,Cu,Cu,So,So,B,B,So,So,So,Xl,Xl,So,So,Xl,Xl,So,So,Cu,Cu,Cu,So,So,So,Sd,_,_,_,_,_,_,_
],


[
_,_,_,_,_,Sd,So,So,So,So,So,So,So,So,So,So,So,So,So,So,So,So,So,So,So,So,So,So,So,So,So,Sd,_,_,_,_,_,_,_
],


[
_,_,_,_,_,_,Sd,Sd,So,So,So,So,So,So,So,So,So,So,So,So,So,So,So,So,So,So,So,So,Sd,Sd,_,_,_,_,_,_,_,_
]

];
const SofaScene = () => {

  const [hearts, setHearts] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [time, setTime] = useState(0);

  const containerRef = useRef(null);



  useEffect(() => {

    const interval = setInterval(() => {
      setTime(t => t + 1);
    },100);

    return () => clearInterval(interval);

  },[]);



  const removeHeart = useCallback((id)=>{

    setHearts(
      h => h.filter(item => item.id !== id)
    );

  },[]);



  const removeQuote = useCallback((id)=>{

    setQuotes(
      q => q.filter(item => item.id !== id)
    );

  },[]);




  const handleClick = (e,who)=>{

    const rect =
      containerRef.current.getBoundingClientRect();


    const x =
      e.clientX - rect.left;


    const y =
      e.clientY - rect.top;



    if(Math.random() > 0.45){

      const list =
        who === "siu"
        ? QUOTES_SIU
        : QUOTES_XINXIN;


      const text =
        list[
          Math.floor(
            Math.random()*list.length
          )
        ];



      setQuotes(q=>[
        ...q,
        {
          id:Date.now(),
          x,
          y,
          text,
          who
        }
      ]);

    }

    else {


      for(let i=0;i<3;i++){

        setTimeout(()=>{

          setHearts(h=>[
            ...h,
            {
              id:Date.now()+i,
              x:
                x+(Math.random()-0.5)*30,
              y:y-10
            }
          ]);


        },i*120);

      }

    }

  };



  const sunOpacity =
    0.03 +
    Math.sin(time*0.05)*0.015;



  return (

<div

style={{

width:"100%",
minHeight:"100vh",

display:"flex",

flexDirection:"column",

alignItems:"center",

justifyContent:"center",

background:
"linear-gradient(180deg,#f8ead0 0%,#f0dcc0 40%,#e8d0b0 100%)",

fontFamily:
"'Noto Serif SC',Georgia,serif",

overflow:"hidden",

position:"relative",

userSelect:"none"

}}

>



<div

style={{

marginBottom:24,

textAlign:"center",

color:"#6a5a48",

letterSpacing:3

}}

>

<div

style={{

fontSize:14,

opacity:.6,

marginBottom:6

}}

>

Fortune & Siu

</div>


<div

style={{

fontSize:11,

opacity:.4

}}

>

点我们，会有惊喜

</div>


</div>





<div

ref={containerRef}

style={{

position:"relative",

width:340,

height:320,

borderRadius:16,

overflow:"hidden",

boxShadow:
"0 8px 32px rgba(120,90,60,.15)"

}}

>





{/* 背景窗户 */}

<div

style={{

position:"absolute",

inset:0,

background:

"linear-gradient(180deg,#87CEEB 0%,#f5c87a 50%,#e8956a 80%,#d4784a 100%)"

}}

/>





{/* 窗框 */}

<div

style={{

position:"absolute",

top:0,

left:20,

right:20,

height:180,

border:"3px solid #c4a882",

borderBottom:"none",

borderRadius:"8px 8px 0 0"

}}

/>



<div

style={{

position:"absolute",

top:0,

left:"50%",

width:3,

height:180,

background:"#c4a882"

}}

/>



<div

style={{

position:"absolute",

top:89,

left:20,

right:20,

height:3,

background:"#c4a882"

}}

/>





{/* 阳光 */}

<div

style={{

position:"absolute",

top:30,

right:60,

width:50,

height:50,

borderRadius:"50%",

background:

"radial-gradient(circle,rgba(255,220,150,.8),transparent 70%)"

}}

/>



<div

style={{

position:"absolute",

top:50,

right:40,

width:200,

height:260,

background:

`linear-gradient(220deg,rgba(255,220,160,${sunOpacity}) 0%,transparent 60%)`,

pointerEvents:"none"

}}

/>





{/* 墙 */}

<div

style={{

position:"absolute",

top:180,

left:0,

right:0,

bottom:0,

background:"#f0e2d0"

}}

/>



{/* 地板 */}

<div

style={{

position:"absolute",

bottom:0,

left:0,

right:0,

height:40,

background:"#d4b896"

}}

/>
  {/* 像素人物区域 */}

<div
  style={{
    position:"absolute",
    bottom:42,
    left:"50%",
    transform:"translateX(-50%)"
  }}
>

  {/* Siu 点击区域 */}
  <div
    onClick={(e)=>handleClick(e,"siu")}
    style={{
      position:"absolute",
      left:0,
      top:0,
      width:"45%",
      height:"70%",
      cursor:"pointer",
      zIndex:10
    }}
  />


  {/* Xinxin 点击区域 */}
  <div
    onClick={(e)=>handleClick(e,"xinxin")}
    style={{
      position:"absolute",
      right:0,
      top:0,
      width:"45%",
      height:"70%",
      cursor:"pointer",
      zIndex:10
    }}
  />


  <PixelGrid
    grid={sceneGrid}
    scale={2.6}
    style={{
      display:"block"
    }}
  />

</div>





{/* 爱心 */}

{
  hearts.map(h=>(

    <Heart
      key={h.id}
      {...h}
      onDone={removeHeart}
    />

  ))
}





{/* 语录 */}

{
  quotes.map(q=>(

    <QuoteBubble

      key={q.id}

      {...q}

      onDone={removeQuote}

    />

  ))
}





{/* 氛围光 */}

<div

style={{

position:"absolute",

inset:0,

background:

"radial-gradient(ellipse at 70% 30%,rgba(255,200,120,.06) 0%,transparent 70%)",

pointerEvents:"none"

}}

/>



</div>






{/* 底部文字 */}

<div

style={{

marginTop:20,

textAlign:"center",

color:"#a09080",

fontSize:10,

letterSpacing:2

}}

>

钢印永在，门不会关

</div>



</div>


  );

};



export default SofaScene;
