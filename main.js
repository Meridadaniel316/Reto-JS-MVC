(function(){
    self.Board = function(width,height){
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
    }

    self.Board.prototype = {
        get elements(){
            var elements = this.bars;
            //elements.push(this.ball);
            return elements;
        }
    }

})();

(function(){
    self.Bar = function(x,y,widht,height,board){
        this.x = x;
        this.y = y;
        this.width = widht;
        this.height = height;
        this.board = board;
        this.board.bars.push(this);
        this.kind = "rectangle";
        this.speed = 10;
    }
    

    self.Bar.prototype = {
        down: function(){
            this.y += this.speed;
        },
        up: function(){
            this.y -= this.speed;
        },
        toString: function(){
            return "x: "+ this.x +" y: "+ this.y;
        }
    }
})();

(function(){
    self.BoardView = function(canvas,board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.contexto = canvas.getContext("2d");
    }

    self.BoardView.prototype = {
        clean: function(){
            this.contexto.clearRect(0,0,this.board.width,this.board.height);
        },
        draw: function(){
            for ( var i = this.board.elements.length - 1; i >= 0; i--){
                var el = this.board.elements[i];

                draw(this.contexto,el);
            };
        },
        play: function(){
            this.clean();
            this.draw();
        }
    }

    function draw(contexto,element){
    console.log(element);
        switch(element.kind)
        {
            case "rectangle": 
                contexto.fillRect(element.x,element.y,element.width,element.height);
                break;
        }
    }

})();

var board = new Board(800,400);
var bar = new Bar(10,100,40,100,board);
var bar_2 = new Bar(750,100,40,100,board);
var canvas = document.getElementById('canvas');
var board_view = new BoardView(canvas,board);

document.addEventListener("keydown",function(ev){
    ev.preventDefault();
    if(ev.keyCode == 38){
        bar_2.up();
    }
    else if(ev.keyCode == 40){
        bar_2.down();
    }
    else if(ev.keyCode == 87){
        bar.up();
    }
    else if(ev.keyCode == 83){
        bar.down();
    }

    console.log(bar.toString());
})


window.requestAnimationFrame(controller);

function controller()
{
    board_view.play();
    window.requestAnimationFrame(controller);
}

