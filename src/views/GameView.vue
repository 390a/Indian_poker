<template>
  <div id="main">
    <div class="start_msg">
      Indian Poker
    </div>
    <div class="description_msg">
      Rules: The player with the highest trump number wins.<br>At the end of the game, your ranking will be determined by the total number of cards you have drawn.
    </div>
    <ul>
      <li>
        <img
          class="img_head"
          src="../trumpCard/clover.png"
        >
      </li>
      <li>
        <img
          class="img_head"
          src="../trumpCard/heart.png"
        >
      </li>
      <li>
        <img
          class="img_head"
          src="../trumpCard/spade.png"
        >
      </li>
      <li>
        <img
          class="img_head"
          src="../trumpCard/diamond.png"
        >
      </li>
    </ul>
    <div
      v-if="result_win"
      class="start_msg"
    >
      WIN 勝利
      <ul>
        <li>
          <button @click="restart">
            <div class="btn_char">
              Rematch
            </div>
          </button>
        </li>
        <li>
          <button @click="end">
            <div class="btn_char">
              End
            </div>
          </button>
        </li>
      </ul>
    </div>
    <div
      v-if="result_lose"
      class="start_msg"
    >
      LOSE 敗北
      <ul>
        <li>
          <button @click="restart">
            <div class="btn_char">
              Rematch
            </div>
          </button>
        </li>
        <li>
          <button @click="end">
            <div class="btn_char">
              End
            </div>
          </button>
        </li>
      </ul>
    </div>
    <div
      v-if="score_result"
      class="start_msg"
    >
      <p>
        1位 {{ first }}<br>
        2位 {{ second }}<br>
        3位 {{ third }}<br>
        4位 {{ fourth }}
      </p>
      <li>
        <button @click="restart">
          <div class="btn_char">
            Rematch
          </div>
        </button>
      </li>
    </div>
    <div>
      <div v-if="user_display">
        <ul>
          <span />
          <li class="user_font">
            user
          </li>
          <span />
        </ul>
        <ul>
          <span />
          <li id="user">
            <img
              class="img_main"
              :src="user_card"
            >
          </li>
          <span />
        </ul>
      </div>
      <ul>
        <li v-if="start_btn">
          <button
            value="開始"
            @click="start"
          >
            <div class="btn_char">
              Start
            </div>
          </button>
        </li>
        <li v-if="fight_btn">
          <button @click="fight">
            <div class="btn_char">
              Fight
            </div>
          </button>
        </li>
        <li v-if="change_btn">
          <button @click="change_card">
            <div class="btn_char">
              Card change
            </div>
          </button>
        </li>
      </ul>
      <div v-if="cp_display">
        <ul>
          <li class="cp_font">
            CP1
          </li>
          <li class="cp_font">
            CP2
          </li>
          <li class="cp_font">
            CP3
          </li>
        </ul>
        <ul id="cp">
          <li id="cp1">
            <img
              class="img_main"
              :src="cp1_card"
            >
          </li>
          <li id="cp2">
            <img
              class="img_main"
              :src="cp2_card"
            >
          </li>
          <li id="cp3">
            <img
              class="img_main"
              :src="cp3_card"
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data: function(){
        return{
           user_card: process.env.BASE_URL + 'trumpCard/backSide.png' ,
           user_selected_card: process.env.BASE_URL + 'trumpCard/backSide.png' ,
           cp1_card: process.env.BASE_URL + 'trumpCard/backSide.png',
           cp2_card: process.env.BASE_URL + 'trumpCard/backSide.png',
           cp3_card: process.env.BASE_URL + 'trumpCard/backSide.png' ,
           cardArray: [],
           cardNumberArray: new Array(4),
           scoreResult: {},//スコアボード
           start_btn: true,//開始ボタン
           fight_btn: false,//勝負ボタン
           change_btn: false,//カード変更ボタン
           restart_btn: true,//再戦ボタン
           end_btn: true,//終了ボタン
           result_win: false,//結果(勝利)画面
           result_lose: false,//結果(敗北)画面
           score_result: false,//スコアボード
           first: '',
           second: '',
           third: '',
           fourth: '',
           user_display: true,
           cp_display: true,
        };
    },

    methods: {
        start: function(){
            let i=0;
            let cardArray = new Array(4);
            let card;
            let cardPattern, cardNumber;
            while(i < 4){
                
                cardPattern = Math.floor((Math.random()*4)+1);
                cardNumber = Math.floor((Math.random() * 13)+1);
                card = process.env.BASE_URL + 'trumpCard/'+cardNumber+'_'+cardPattern + '.png';
       
                if(i !== 0){
                    if(!cardArray.includes(card)){
                        this.cardNumberArray[i] = cardNumber;
                        cardArray[i] = card;
                        i++;
                    }
                } else {
                    this.cardNumberArray[0] = cardNumber;
                    cardArray[0] = card;
                    i++;
                }
                
            }
            //カードの重複チェックが終わったら、ユーザとcpにそれぞれカードを振る
            console.log(cardArray)
            this.user_selected_card = cardArray[0];
            this.cp1_card = cardArray[1];
            this.cp2_card = cardArray[2];
            this.cp3_card = cardArray[3];
            this.cardArray = cardArray;

            this.start_btn = false;//開始ボタン非表示
            this.fight_btn = true;//勝負ボタン表示
            this.change_btn = true;//カード変更ボタン表示
        },
        fight: function(){
            this.user_card = this.user_selected_card;

            this.start_btn = false;//開始ボタン非表示
            this.fight_btn = false;//勝負ボタン非表示
            this.change_btn = false;//カード変更ボタン非表示
            

            //ユーザのトランプの数値
            let userNumber = this.cardNumberArray[0];
            //cpとユーザの中で一番大きな数字を取り出す
            const maxNumber = Math.max.apply(null,this.cardNumberArray);
            if(maxNumber !== userNumber){
                this.result_lose = true;
            } else {
                this.result_win = true;
            }


            console.log(this.scoreResult.user)
            if(this.scoreResult.user === undefined){
                
                this.scoreResult.user = 0 + this.cardNumberArray[0];
                this.scoreResult.cp1 = 0 + this.cardNumberArray[1];
                this.scoreResult.cp2 = 0 + this.cardNumberArray[2];
                this.scoreResult.cp3 = 0 + this.cardNumberArray[3];
            } else {
                this.scoreResult.user = this.scoreResult.user + this.cardNumberArray[0];
                this.scoreResult.cp1 = this.scoreResult.cp1 + this.cardNumberArray[1];
                this.scoreResult.cp2 = this.scoreResult.cp2 + this.cardNumberArray[2];
                this.scoreResult.cp3 = this.scoreResult.cp3 + this.cardNumberArray[3];
            }
        },
        change_card: function(){
            let check=0;
            let cardArray = this.cardArray;
            while(check < 1){
                let cardPattern = Math.floor((Math.random()*4)+1);
                let cardNumber = Math.floor((Math.random() * 13)+1);
                cardArray[0] = process.env.BASE_URL + '/trumpCard/'+cardNumber+'_'+cardPattern + '.png';
                this.cardNumberArray[0] = cardNumber;
                    
                for(let x=1;x < 4;x++){
                    if(cardArray[x] !== cardArray[0]){
                        check++;
                    }
                }
                
            }
            //カードの重複チェックが終わったら、ユーザとcpにそれぞれカードを振る
            console.log(cardArray)
            this.user_selected_card = cardArray[0];
            this.cp1_card = cardArray[1];
            this.cp2_card = cardArray[2];
            this.cp3_card = cardArray[3];
            this.cardArray = cardArray;

            this.start_btn = false;//開始ボタン非表示
            this.fight_btn = true;//勝負ボタン表示
            this.change_btn = true;//カード変更ボタン表示
        },
        restart: function(){//ゲーム開始画面に戻る
            this.score_result = false; //スコアボード非表示
            this.user_display = true; //ユーザー画面表示
            this.cp_display = true; //cp画面表示
            //結果画面非表示
            this.result_win = false;
            this.result_lose = false;
            this.start_btn = true;//開始ボタン
            this.fight_btn = false;//勝負ボタン
            this.change_btn = false;//カード変更ボタン

            this.user_card=process.env.BASE_URL + '/trumpCard/backSide.png';
            this.user_selected_card=process.env.BASE_URL + '/trumpCard/backSide.png';
            this.cp1_card =process.env.BASE_URL + '/trumpCard/backSide.png';
            this.cp2_card=process.env.BASE_URL + '/trumpCard/backSide.png';
            this.cp3_card=process.env.BASE_URL + '/trumpCard/backSide.png';

        },
        end: function(){
            let pairs = Object.entries(this.scoreResult);
            pairs.sort(function(p1, p2){
            var p1Key = p1[1], p2Key = p2[1];
            if(p1Key < p2Key){ return -1; }
            if(p1Key > p2Key){ return 1; }
            return 0;
            })
            this.scoreResult = {};

            console.log(pairs);
            console.log(this.scoreResult)
            //順位ごとに名前とポイント数を入れる（名前を4文字に揃えてコロンの位置を揃える）
            this.first  = pairs[3][0].padEnd(4, ' ') + ':' + pairs[3][1].toString().padStart(2, ' ') + 'pt';
            this.second = pairs[2][0].padEnd(4, ' ') + ':' + pairs[2][1].toString().padStart(2, ' ') + 'pt'; 
            this.third  = pairs[1][0].padEnd(4, ' ') + ':' + pairs[1][1].toString().padStart(2, ' ') + 'pt';
            this.fourth = pairs[0][0].padEnd(4, ' ') + ':' + pairs[0][1].toString().padStart(2, ' ') + 'pt';
            //結果非表示し、スコアボード表示する
            this.result_win = false;
            this.result_lose = false;
            this.score_result  = true;
            this.user_display = false;
            this.cp_display = false;
            //再戦ボタン表示する
            this.restart_btn = true;
        },
    },
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');
    
     #main {
        background-color:rgb(3, 109, 29);
        min-height: 100vh;
     }
    
     ul{
        display: flex;
        justify-content: center;
        align-items: center;
     }
    
     li{
        list-style: none;
     }
    
     span{
        width:150px;
     }
    
     button{
        display: block;
        margin: auto;
        width: 120px;
        height: 70px;
        background: gold;
        border-radius:30px;/*角の半径（丸くしている） */
        border: none;
        cursor: pointer;
     }
    
     .img_head{
        width:70px;
        height:85px;
     }
     .img_main{
        width: 150px;
        height: 180px;
     }
    
     .start_msg{
        text-align: center;
        font-size: xx-large;
        color: cornsilk;
        font-family: 'DotGothic16';
     }
    
     .start_msg p {
        font-family: 'Courier New', monospace;
        text-align: left;
        display: inline-block;
     }
    
     .btn_char{
        text-align: center;
        color:coral;
        font-size:large;
        font-family: 'DotGothic16';
     }
    
     .cp_font{
        width:150px;
        font-size:large;
        font-family:'DotGothic16';
        color:azure;
     }
     
     .user_font{
        width:150px;
        font-size:large;
        font-family:'DotGothic16';
        color:fuchsia;
     }
     .description_msg{
        text-align: center;
        font-size:medium;
        color: cornsilk;
        font-family: 'DotGothic16';
     }
     
</style>