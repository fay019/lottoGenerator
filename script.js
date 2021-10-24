lotto = {
    numbers: [],
    allNumbers: [],
    numberPrint: 0,
    _divNumbers: document.querySelectorAll( '#numbers')[0],
    _divPrintHistory: document.querySelectorAll( '#printHistory')[0],
    _divHistory: document.querySelectorAll( '#history')[0],
    _divClearScreen: document.querySelectorAll( '#clearScreen')[0],
    generator: function (size, numStart, numEnd) {
        this.numbers = []
        this.divChildRemove( this._divNumbers )
        for(var i = 0; i < size; i++) {
            var add = true;
            var randomNumber = Math.floor(Math.random() * numEnd) + numStart;
            for(var y = 0; y < numEnd; y++) {
                if(this.numbers[y] === randomNumber) {
                    add = false;
                }
            }
            if(add) {
                this.numbers.push(randomNumber);
            } else {
                i--;
            }
        }
        this.numOrder( this.numbers );
        this.printNum( this.numbers, 'numbers' );
        this.setAllNumbers(this.numbers);
    },

    // array order
    numOrder: function( numbers ) {
        var bigNumber = 0;
        for(var m = 0; m < numbers.length; m++) {
            for(var n = m + 1; n < numbers.length; n++) {
                if(numbers[n] < numbers[m]) {
                    bigNumber = numbers[m];
                    numbers[m] = numbers[n];
                    numbers[n] = bigNumber;
                }
            }
        }
        this.numbers = numbers;
    },
    // we make our history
    setAllNumbers: function(numbers ) {
        // put the history btn
        this.allNumbers.length <= 0 ? this.btnHistory() : '';
        this.allNumbers.length <= 0 ? this.btnClearScreen() : '';
        this.allNumbers.push( numbers );
    },
    // make btn history
    btnGenerator: function() {
        var div = document.querySelectorAll('#numGene')[0];
        var btn = document.createElement('button');
        btn.id = 'btnGenerator';
        btn.classList.add('btn', 'btn-sm', 'btn-primary');
        btn.style.margin = '20px'
        btn.style.borderRadius = '15px'
        btn.setAttribute('onclick', 'lotto.generator(6,1,45);')
        btn.innerHTML = 'Generate'
        div.appendChild(btn);
    },

    printNum: function( numbers, parent ) {
        var divs = document.querySelectorAll( '#' + parent )[0];
        var div = document.createElement( 'div' );
        var divClass = 'num-' + parent;
        div.classList.add( divClass );
        div.innerHTML = numbers.join(" - ");
        divs.appendChild( div )
        console.log(lotto)
    },
    
    btnHistory: function() {
        var div = document.querySelectorAll('#history')[0];
        var btn = document.createElement('button');
        btn.id = 'btnHistory';
        btn.classList.add('btn', 'btn-sm', 'btn-success');
        btn.style.margin = '20px'
        btn.style.borderRadius = '15px'
        btn.setAttribute('onclick', 'lotto.printHistory();')
        btn.innerHTML = 'History'
        div.appendChild(btn);
    },

    printHistory: function () {
        this.divChildRemove( this._divPrintHistory );
        for (let i = 0; i < this.allNumbers.length; i++) {
            this.printNum( this.allNumbers[ i ], 'printHistory' );
        }
    },
    
    divChildRemove: function ( parent ) {
        if ( parent.hasChildNodes()) {
            parent.innerHTML = '';
        }
    },

    // we edit our array  in X position 
    editNum: function( pos, numbers) {
     this.allNumbers[pos] = numbers;
    },


    btnClearScreen: function() {
        var div = document.querySelectorAll('#clearScreen')[0];
        var btn = document.createElement('button');
        btn.id = 'btnClearScreen';
        btn.classList.add('btn', 'btn-sm', 'btn-danger');
        btn.style.margin = '20px'
        btn.style.borderRadius = '15px'
        btn.setAttribute('onclick', 'lotto.clearScreen();')
        btn.innerHTML = 'Clear'
        div.appendChild(btn);
    },

    clearScreen: function () {
        this.numbers = [];
        this.allNumbers = [];
        this.numberPrint = 0;
        this._divNumbers.innerHTML = '';
        this._divPrintHistory.innerHTML = '';
        this._divHistory.innerHTML = '';
        this._divClearScreen.innerHTML = '';

    },
}
lotto.btnGenerator();
