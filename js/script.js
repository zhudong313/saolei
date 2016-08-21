/**
 * Created by Administrator on 2016/8/21.
 */
var arr=[];//二维数组
var arrResult=[];//雷区
var allLis=[];//所有的li
var boxNode=document.getElementById('box');
var ulNode=boxNode.getElementsByTagName('ul')[0];
var qiNumNode=boxNode.getElementsByTagName('div')[0];
var qiNumSpan=qiNumNode.getElementsByTagName('span')[0];
var qiNumStrong=qiNumNode.getElementsByTagName('strong')[0];
function ballNum(rows,bombNum){
    var flag=document.createDocumentFragment();
    var cols=boxNode.clientWidth/40;

    for(var i=0;i<cols;i++){//盘子
        arr[i]=[];
        allLis[i]=[];
        for(var  j=0;j<rows;j++){
            var li=document.createElement('li');
            li.y=i;//注意：纵坐标
            li.x=j;//注意：横坐标
            flag.appendChild(li);
            allLis[i][j]=li;
            arr[i][j]=true;
        }
    }
    ulNode.appendChild(flag);

    //随机产生炸弹
    var arrAll=[];
    for(var k=0;k<cols*rows;k++){//所有位置
        arrAll.push(k);
    }

    for(var n=0;n<bombNum;n++){//随机取bombNum个雷
        var radomPos=Math.floor(Math.random()*arrAll.length);
        arrResult.push(arrAll[radomPos]);
        arrAll.splice(radomPos,1);
    }

    //console.log(arrResult);
    for(var m=0;m<arrResult.length;m++){
        //console.log(arrResult[m],cols);
       var y=Math.floor(arrResult[m]/cols);//注意：纵坐标
       var x=arrResult[m]%cols;//注意：横坐标
        arr[y][x]=false;
    }

    //console.log(arrAll,arrResult,arr);
    return bombNum;

}

function mouseDownFun(e){
    var event=window.event || e;
    var target=event.srcElement || event.target;
    if(target.nodeName.toLowerCase()=='li') {
        if ((event.button == 0 || (!!window.attachEvent && event.button == 1)) && target.className.indexOf('qi')==-1) {//左键

            downFun(target);//判断
        }
        else if (event.button == 2 && target.className.indexOf('none')==-1 && target.innerHTML=='') {//右键,切换旗子
            if(target.className.indexOf("qi")==-1){
                if(qiNum>0)
                {
                    target.className="qi";
                    qiNum--;
                }
            }
            else
            {
                target.className="";
                qiNum++;
            }
        }

        qiNumSpan.innerHTML=qiNum;//旗子数量
    }

}

function downFun(target){//左键
    var x = target.x;
    var y = target.y;
    if (arr[y][x]) {//无炸弹
        /*规律:x-1到x+1
                  y-1到y+1;
        */

        //console.log(x,y);
        var leiNum=0;
        for(var i=y-1;i<=y+1;i++)//周围有多少雷
        {
            for(var j=x-1;j<=x+1;j++)
            {
              // console.log(i,j);
                if(i>=0 && j>=0)
                {
                    if(arr[i]==null)
                        continue;
                    if(arr[i][j]===false){//有雷
                        leiNum++;
                    }
                }
            }
        }

        if(leiNum!=0)
        {
            target.innerHTML=leiNum;
            return;
        }
        else
        {
            target.className="none";
            for(var i=y-1;i<=y+1;i++)
            {
                for(var j=x-1;j<=x+1;j++)
                {
                    // console.log(i,j);
                    if(i>=0 && j>=0)
                    {
                        if(arr[i]!=null && arr[i][j]!=null)
                        {
                            if(allLis[i][j].className=='' && allLis[i][j].innerHTML=='')
                            {
                                //console.log(i,j,'    ', y,x);
                                downFun(allLis[i][j]);
                            }
                        }
                    }
                }
            }
        }

    }
    else{//炸弹
        var lisNode=target.parentNode.getElementsByTagName('li');
        for(var i=0;i<arrResult.length;i++){
            lisNode[arrResult[i]].className="lei";
        }
        //console.log(arrResult);
    }
}



qiNum=ballNum(10,10);//旗子的数量
qiNumSpan.innerHTML=qiNum;
qiNumStrong.innerHTML=qiNum;
boxNode.onmousedown=function(e){
    mouseDownFun(e);
};
