const red = document.getElementById("red");
const blue = document.getElementById("blue");
const green = document.getElementById("green");
const yellow = document.getElementById("yellow");
const listo = document.getElementById("listo");
const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
// AUDIOS
const ganaste = new Audio("./audios/luisito-saludando-bien-perron (mp3cut.net).mp3");
const don = new Audio("./audios/sound_do.wav")
const fa = new Audio("./audios/sound_fa.wav")
const la = new Audio("./audios/sound_la.wav")
const mi = new Audio("./audios/sound_mi.wav")
const sol =  new Audio("./audios/sound_sol.wav")
const re =  new Audio("./audios/sound_re.wav")

listo.addEventListener("click", startGame);

class Juego{
    constructor(){
        this.inicializar()
        this.generateRandomSequence()
        setTimeout(()=>{
        this.nextLevel()
        },700)
    }
    inicializar(){
        this.nextLevel = this.nextLevel.bind(this);
        this.LAST_LEVEL = 3;
        this.resetLevels();
        this.check = this.check.bind(this);
        listo.classList.add("hide");
        this.frecuencia = 700;
        this.level = 1;
        this.colors = {
            red,
            blue,
            green,
            yellow
        }
    }
    resetLevels(){
        one.style.backgroundColor = "#454545"
        two.style.backgroundColor = "#454545"
        three.style.backgroundColor = "#454545"
        one.style.color = "#353535"
        two.style.color = "#353535"
        three.style.color = "#353535"
    }
    generateRandomSequence(){
        this.sequence = new Array(9).fill(0).map(n => Math.floor(Math.random()*4));
    }
    nextLevel(){
        this.subnivel = 0;
        this.illuminateSequence();
        const podesJugar = this.frecuencia*3*this.level;
        setTimeout(_=>{this.addEvents()},podesJugar)
    }
    fromNumberToColor(num){
        switch(num){
            case 0: return 'red'
            case 1: return 'blue'
            case 2: return 'green'
            case 3: return 'yellow'
        }
    }
    fromColorToNumber(col){
        switch(col){
            case'red': return 0
            case'blue': return 1
            case'green': return 2
            case'yellow':return 3
        }
    }
    illuminateSequence(){
        for(let i=0; i<this.level*3; i++){
            let color = this.fromNumberToColor(this.sequence[i]);
            setTimeout(_=> this.illuminateColor(color), this.frecuencia*i)
        }
    }
    illuminateColor(color){
        this.colors[color].classList.add('illuminated')
        this.switchAudio(this.fromColorToNumber(color))
        setTimeout(() => {
            this.turnOffColor(color);
        }, 350);
    }
    turnOffColor(color){
        this.colors[color].classList.remove('illuminated')
    }
    addEvents(){
        this.colors.red.addEventListener("click", this.check)
        this.colors.blue.addEventListener("click", this.check)
        this.colors.yellow.addEventListener("click", this.check)
        this.colors.green.addEventListener("click", this.check)
    }
    removeEvents(){
        this.colors.red.removeEventListener("click", this.check)
        this.colors.blue.removeEventListener("click", this.check)
        this.colors.yellow.removeEventListener("click", this.check)
        this.colors.green.removeEventListener("click", this.check)
    }
    check(ev){
        const nombreColor = ev.target.dataset.color;
        const numeroColor = this.fromColorToNumber(nombreColor);
        this.switchAudio(numeroColor);
        this.illuminateColor(nombreColor);
        if(numeroColor === this.sequence[this.subnivel]){
            this.subnivel++;
            if(this.subnivel === this.level*3){
                this.levelUp()
                this.removeEvents()
                if(this.level === this.LAST_LEVEL+1){
                    //GANÓ
                    this.win()
                }else{
                    setTimeout(this.nextLevel, 1000)
                }
            }
        }else{
            //Perdió
            this.lose()
        }
    }
    win(){
        listo.classList.remove("hide")
        listo.innerText = "GANASTE!"
        this.removeEvents()
        ganaste.play()
    }
    lose(){
        listo.classList.remove("hide")
        listo.innerText = "PERDISTE"
        this.removeEvents()
    }
    levelUp(){
        this.level++
        switch(this.level){
            case 2: {one.style.backgroundColor = "#06d6a0"
                    one.style.color = "#f8f9fa"
                    this.frecuencia -= 50}
            break
            case 3: {two.style.backgroundColor = "#06d6a0"
                    two.style.color = "#f8f9fa"
                    this.frecuencia -= 100}
            break
            case 4: {three.style.backgroundColor = "#06d6a0"
                    three.style.color = "#f8f9fa"}
            break
        }
    }
    playSound(audio){
        const clone = audio.cloneNode()
        clone.play()
    }
    switchAudio(color){
        switch(color){
            case 0: this.playSound(don)
            break
            case 1: this.playSound(re)
            break
            case 2: this.playSound(mi)
            break
            case 3: this.playSound(fa)
            break
        }
    }
}

function startGame(){
    new Juego();
}


