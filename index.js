let player1;
let player2;
let playing;
let btnPlayAgain = $(".playAgain");
let one,two,three,four,five,six,seven,eight,nine;
let clickCount=0;
let onGoingPlayer;
let clickNumbers=0;
let nowPlay =$("#nowPlaying");
let round ='Tik-Tac_Toe/—Pngtree—pink solid cardboard round frame_3772538.png';
let cross = 'Tik-Tac_Toe/—Pngtree—red cross vector icon no_6234858.png';

$("#btn").click(()=>{             // submit players' names
    let name = $("#inputID").val().toUpperCase();
    if(name!==""){
        if(player1===undefined){
            player1=name;
            $("#player1").text(`Player 1: ${name}`);
            $("#inputID").val('')
        }else if(player2===undefined){
            player2 = name;
            $("#player2").text(`Player 2: ${name}`)
            $("#inputID").val('')
        }else{
            player1=undefined;
            player2=undefined;
            alert("Only 2 players can play.Please Refresh")
            $("#inputID").val('')
        }
    }else{
        console.log("Please enter a name")
    }
});

btnPlayAgain.click(()=>{
    location.reload();
});

$(".box").click(function play(e){     //playing the game
    if (!$(e.target).css("background-image").includes('url')) { // ensure box is not already clicked
        clickCount++;
        playing = checkPlayer(clickCount);
        changeBackground(playing, e.target.id);

        let boxed = e.target.id;
        let boxID = $(`#${boxed}`);
        boxID.css({
            "transition": "border 0.3s, transform 0.3s",
            "background-color": "rgba(248,248,68,0.49)"
        })
        updateUrl();
        if (checkRules()) {
            let won = localStorage.getItem("nowPlaying");
            $(".clicked").text(`YOU ARE THE WINNER:- ${won}!!!`).css({
                "fontsize": "20px",
                'color': "#D90400"
            });
            $(".box").off("click");
        }else {
            if(playing ===undefined){
                $(".clicked").text(`Please Enter Your Names First`).css({
                    "fontsize": "20px",
                    'color': "#D90400"
                });boxID.css({
                    "transition": "border 0.3s, transform 0.3s",
                    "background-color": "rgba(156, 198, 192, 0.7)"
                })
            }else if(clickNumbers===9){
                $(".clicked").text(`-----GAME IS DRAW-----`).css({
                    "fontsize": "20px",
                    'color': "#D90400"
                });
            }
        }

    }else{
        alert("Box is already filled.");
    }
});
function updateUrl(){             // taking url parameter of each background image
    one=$("#i1").css("background-image");
    two=$("#i2").css("background-image");
    three=$("#i3").css("background-image");
    four=$("#i4").css("background-image");
    five=$("#i5").css("background-image");
    six=$("#i6").css("background-image");
    seven=$("#i7").css("background-image")
    eight=$("#i8").css("background-image");
    nine=$("#i9").css("background-image")
}

function checkPlayer(){     //check who is playing now
    if(clickCount%2===0){
        onGoingPlayer = player1;
    }else{
        onGoingPlayer=player2;
    }
    return onGoingPlayer;
}

function changeBackground(player, clickedID){            //change "o" and "X"
    if(clickNumbers<9){
        if(player === `${player1}`){
            nowPlay.text("Now Playing :");
            $(`#${clickedID}`).css({"background-image": `url('${round}')`,
                "backgroundSize": "cover",
                "backgroundRepeat": "no-repeat",
                "backgroundPosition": "center"
            })

            nowPlay.append(`${player}`);
            clickNumbers++;
            $("#clickedTimes").text(`You 2 have ${9-clickNumbers} boxes remain`);

        }else if(player === `${player2}`){
            nowPlay.text("Now Playing :")
            $(`#${clickedID}`).css({"background-image":`url('${cross}')`,
                "backgroundSize": "cover",
                "backgroundRepeat": "no-repeat",
                "backgroundPosition": "center"
            });
            nowPlay.append(`${player}`)
            clickNumbers++;
            $("#clickedTimes").text(`You 2 have ${9-clickNumbers} boxes remain`);

        }else{
            alert("Please Enter Both of your Names");
        }
    }else{
        updateUrl();
        clickNumbers=0;
        alert("you can't change filled boxes");
    }
}

function createHorizontalLine(marginTop){ // create Horizontal line when win
    let left = 555;
    let right = 990;
    let length = 435;

    let line = document.createElement('div');
    line.id = 'line';

    line.style.left = left+"px";
    line.style.right = right+"px";
    line.style.width = length+"px";
    line.style.height = "2px";
    line.style.marginTop = marginTop+"px";
    document.querySelector('.main-container').appendChild(line);
}

function createVerticalLine(marginLeft){   // create Vertical line when win
    let top = 185;
    let bottom = 650;
    let length = 405;

    let line = document.createElement('div');
    line.id = 'line';

    line.style.top = top+"px";
    line.style.bottom = bottom+"px";
    line.style.height = length+"px";
    line.style.width = "2px";
    line.style.marginLeft = marginLeft+"px";
    document.querySelector('.main-container').appendChild(line);
}

function createSlantLine(isPositiveOrNegative){   // create Slant line when win
    let line = document.createElement('div');
    let top;
    let left;
    let length;

    if(isPositiveOrNegative === "Positive"){
        line.style.transform = "rotate(-45deg)";
        top = 600;
        left=588;
        length =570;

    }else if(isPositiveOrNegative === "Negative"){
        top = 180;
        left=588;
        length =570;
        line.style.transform = "rotate(45deg)";
    }
    line.id = 'line';
    line.style.top = top+"px";
    line.style.left = left+"px";
    line.style.width = length+"px";
    line.style.height = "2px";
    line.style.transformOrigin = "0 0";

    document.querySelector('.main-container').appendChild(line);
}
function checkRules(){   //check whether win or loss
    if(one===two&&two===three){
        if(one!=="none" && two!=="none" && three!=="none"){
            createHorizontalLine("69");
            localStorage.setItem("nowPlaying", playing);
            return true;
        }
    }else if(four===five&&five===six){
        if(four!=="none" && five!=="none" && six!=="none"){
            createHorizontalLine("200")
            localStorage.setItem("nowPlaying", playing);
            return true;
        }
    }else if(seven===eight&&eight===nine){
        if(seven!=="none" && eight!=="none" && nine!=="none"){
            createHorizontalLine("331");
            localStorage.setItem("nowPlaying", playing);
            return true;
        }
    }else if(one===four&&four===seven){
        if(one!=="none" && four!=="none" && seven!=="none"){
            createVerticalLine("70");
            localStorage.setItem("nowPlaying", playing);
            return true;
        }
    }else if(two===five&&five===eight){
        if(two!=="none" && five!=="none" && eight!=="none"){
            createVerticalLine("201")
            localStorage.setItem("nowPlaying", playing);
            return true;
        }
    }else if(three===six&&six===nine){
        if(three!=="none" && six!=="none" && nine!=="none"){
            createVerticalLine("332")
            localStorage.setItem("nowPlaying", playing);
            return true;
        }
    }else if(three===five&& five===seven){
        if(three!=="none" && five!=="none" && seven!=="none"){
            createSlantLine("Positive");
            localStorage.setItem("nowPlaying", playing);
            return true;
        }
    }else if(one===five&&five===nine){
        if(one!=="none" && five!=="none" && nine!=="none"){
            createSlantLine("Negative");
            localStorage.setItem("nowPlaying", playing);
            return true;
        }
    }else{
        return false;
    }
}

