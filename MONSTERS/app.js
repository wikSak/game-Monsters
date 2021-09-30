function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: []
        }
    }, 
    computed: {
        monsterBarStyles() {
            if(this.monsterHealth < 0) {
                return { width: '0%'}
            }
            return {width: this.monsterHealth + '%'};
        },
            playerBarStyles() {
                if(this.playerHealth < 0) {
                    return { width: '0%'}
                }
                return {width: this.playerHealth + '%'};
            },
        mayUseSpecial() {
            return this.currentRound % 3 !== 0;
        }
    },

    methods: {
        attackMonster() {
            this.currentRound++;
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            this.addLogMessage('Pikachu', 'attack', attackValue);
            
        },
        attackPlayer() {
            const attackValue = getRandomValue(5, 12); 
            this.playerHealth -= attackValue;
            this.addLogMessage('Meowth', 'attack', attackValue);
        },
        specialAttackMonster() {
            this.currentRound++;
            attackValue = getRandomValue(10, 25); 
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            this.addLogMessage('Pikachu', 'attack', attackValue);
        },
        healPlayer() {
            this.currentRound++;
            const healValue = getRandomValue(5, 18);  
            if (this.playerHealth + healValue > 100){
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.attackPlayer();
            this.addLogMessage('Pikachu', 'heal', healValue);
        
        }, 
        newGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.winner = null;
            this.currnerRound = 0;
            this.logMessages = [];
        },
        surrender() {
            this.winner = 'monster';
            this.addLogMessage('Meowth', 'win');


        },
        addLogMessage(who, what, value) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                action: value
            });
        }

    }, 
    watch: {
        //IMPORTANT: name of property you wanna watch

        playerHealth(value) {

            if(value <= 0 && this.monsterHealth <= 0) {
           
                this.winner = 'draw';
            } else if (value <= 0) {
 
          
                //player lost
                this.addLogMessage('Meowth', 'win');
                this.winner = 'monster';
            }
        },
        monsterHealth(value) {
            if(value <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                //monster lost
                this.addLogMessage('Pikachu', 'win');
                this.winner = 'player';

            }
        }
    }
}); 

app.mount('#game');