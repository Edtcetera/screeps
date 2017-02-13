/**
 * Created by edwar on 2/12/2017.
 */
var terminator = {
    state: undefined,
    states: {
        phase0: {
            initialize: function(target) {
                this.target = target;
            },
            enter: function() {
                console.log('setting up phase0');
            },
            execute: function() {
                console.log('phase0');
            },
            play: function() {
                console.log('already phase0!');
            },
            stop: function() {
                this.target.changeState(this.target.states.phase1);
            },
            pause: function() {
                this.target.changeState(this.target.states.phase2);
            },
            exit: function() {
                console.log('tearing down phase0 state');
            }
        },
        phase1:{
            initialize: function(target) {
                this.target = target;
            },
            enter: function() {
                console.log('setting up phase1 state');
            },
            execute: function() {
                console.log('phase1!');
            },
            play: function() {
                this.target.changeState(this.target.states.phase0);
            },
            stop: function() {
                console.log('already stopped!');
            },
            pause: function() {
                this.target.changeState(this.target.states.phase2);
            },
            exit: function() {
                console.log('tearing down phase1 state');
            }
        },
        phase2: {
            initialize: function(target) {
                this.target = target;
            },
            enter: function() {
                console.log('setting up the phase2 state');
            },
            execute: function() {
                console.log('phase2!');
            },
            play: function() {
                this.target.changeState(this.target.states.phase0);
            },
            stop: function() {
                this.target.changeState(this.target.states.phase1);
            },
            pause: function() {
                console.log('already paused');
            },
            exit: function() {
                console.log('tearing down phase2 state!');
            }
        }
    },
    initialize: function() {
        this.states.phase0.initialize(this);
        this.states.phase1.initialize(this);
        this.states.phase2.initialize(this);
        this.state = this.states.phase1;
    },
    play: function() {
        this.state.play();
    },
    stop: function() {
        this.state.stop();
    },
    pause: function() {
        this.state.pause();
    },
    changeState: function(state) {
        if (this.state !== state) {
            this.state.exit();
            this.state = state;
            this.state.enter();
            this.state.execute();
        }
    }
};