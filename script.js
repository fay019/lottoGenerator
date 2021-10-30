lotto = {
    startNumber: 1,
    endNumber: 45,
    drawNumber: 6,
    naxDrawCase: 12,
    numSelected: [],
    numbers: [],
    allNumbers: [],
    numberPrint: 0,
    _divNumbers: document.querySelectorAll( '#numbers' )[ 0 ],
    _divPrintHistory: document.querySelectorAll( '#printHistory' )[ 0 ],
    _divHistory: document.querySelectorAll( '#history' )[ 0 ],
    _divClearScreen: document.querySelectorAll( '#clearScreen' )[ 0 ],
    _divSelect: document.querySelectorAll( '#select' )[ 0 ],
    _divBigCase: document.querySelectorAll( '#bigCase' )[ 0 ],
    _divNumGene: document.querySelectorAll( '#numGene' )[ 0 ],
    generator: function ( size, numStart, numEnd ) {
        this.numbers = []
        if ( this.allNumbers && this.allNumbers.length >= 11 ) {
            document.getElementById( 'btnGenerator' ).classList.add( 'disabled' );
            document.getElementById( 'btnGenerator' ).innerHTML = 'You make 12';
        }
        this.divChildRemove( this._divNumbers )
        for ( var i = 0; i < size; i++ ) {
            var add = true;
            var randomNumber = Math.floor( Math.random() * numEnd ) + numStart;
            for ( var y = 0; y < numEnd; y++ ) {
                if ( this.numbers[ y ] === randomNumber ) {
                    add = false;
                }
            }
            if ( add ) {
                this.numbers.push( randomNumber );
            } else {
                i--;
            }
        }
        this.numOrder( this.numbers );
        this.printNum( this.numbers, 'numbers' );
        this.setAllNumbers( this.numbers );
        this.xSigne()
    },

    //region function to order the Array
    numOrder: function ( numbers ) {
        var bigNumber = 0;
        for ( var m = 0; m < numbers.length; m++ ) {
            for ( var n = m + 1; n < numbers.length; n++ ) {
                if ( numbers[ n ] < numbers[ m ] ) {
                    bigNumber = numbers[ m ];
                    numbers[ m ] = numbers[ n ];
                    numbers[ n ] = bigNumber;
                }
            }
        }
        this.numbers = numbers;
    },
    //endregion

    // we make our history
    setAllNumbers: function ( numbers ) {
        // put the history btn
        this.allNumbers.length <= 0 ? this.btnHistory() : '';
        this.allNumbers.length <= 0 ? this.btnClearScreen() : '';

        this.allNumbers.push( numbers );
    },

    // make btn history
    btnGenerator: function () {
        var div = document.querySelectorAll( '#numGene' )[ 0 ];
        var btn = document.createElement( 'button' );
        var txt = 'lotto.generator( ' + this.drawNumber + ',' + this.startNumber + ',' + this.endNumber + ');'
        btn.id = 'btnGenerator';
        btn.classList.add( 'btn', 'btn-sm', 'btn-primary' );
        btn.style.margin = '20px'
        btn.style.borderRadius = '15px'
        btn.setAttribute( 'onclick', txt )
        btn.innerHTML = 'Generate'
        div.appendChild( btn );
    },

    printNum: function ( numbers, parent ) {
        var divs = document.querySelectorAll( '#' + parent )[ 0 ];
        var div = document.createElement( 'div' );
        var divClass = 'num-' + parent;
        div.classList.add( divClass );
        div.innerHTML = numbers.join( " - " );
        divs.appendChild( div )
    },

    btnHistory: function () {
        var div = document.querySelectorAll( '#history' )[ 0 ];
        var btn = document.createElement( 'button' );
        btn.id = 'btnHistory';
        btn.classList.add( 'btn', 'btn-sm', 'btn-success' );
        btn.style.margin = '20px'
        btn.style.borderRadius = '15px'
        btn.setAttribute( 'onclick', 'lotto.printHistory();' )
        btn.innerHTML = 'History'
        div.appendChild( btn );
    },

    printHistory: function () {
        this.divChildRemove( this._divPrintHistory );
        for ( let i = 0; i < this.allNumbers.length; i++ ) {
            this.printNum( this.allNumbers[ i ], 'printHistory' );
        }
    },

    // if the div has child we remove all what in side
    divChildRemove: function ( parent ) {
        if ( parent.hasChildNodes() ) {
            parent.innerHTML = '';
        }
    },

    // we edit our array  in X position 
    editNum: function ( pos, numbers ) {
        this.allNumbers[ pos ] = numbers;
    },

    //region Clear function button and action
    // creat button Clear Screen
    btnClearScreen: function () {
        var div = document.querySelectorAll( '#clearScreen' )[ 0 ];
        var btn = document.createElement( 'button' );
        btn.id = 'btnClearScreen';
        btn.classList.add( 'btn', 'btn-sm', 'btn-danger' );
        btn.style.margin = '20px'
        btn.style.borderRadius = '15px'
        btn.setAttribute( 'onclick', 'lotto.clearScreen();' )
        btn.innerHTML = 'Clear all'
        div.appendChild( btn );
    },

    //Clear screen function
    clearScreen: function () {
        this.numbers = [];
        this.allNumbers = [];
        this.numberPrint = 0;
        this._divNumbers.innerHTML = '';
        this._divPrintHistory.innerHTML = '';
        this._divHistory.innerHTML = '';
        this._divClearScreen.innerHTML = '';
        this._divBigCase.innerHTML = '';
        this._divNumGene.innerHTML = ''
        this.btnGenerator()
    },
    //endregion

    myHidden: function ( id ) {
        let elm = document.getElementById( id );
        elm.style.display = 'none';
    },

    //region input Select section
    divSelect: function () {
        let selectNum = 1;
        this.numSelected ? selectNum = this.numSelected.length + 1 : '';
        let jump = false;
        let idTxt = 'select-' + selectNum;
        let idTxtBefore = 'select-' + (selectNum - 1);
        let selectList = document.createElement( 'select' );

        if ( selectNum <= this.drawNumber ) {
            selectList.id = idTxt
            selectList.setAttribute( 'name', idTxt );
            selectList.setAttribute( 'onchange', 'lotto.nextDivSelect(this)' );
            selectList.classList.add( 'select-list' );
            this._divSelect.appendChild( selectList );
            let option = document.createElement( "option" );
            option.text = '...';
            selectList.appendChild( option );
            for ( let i = this.startNumber; i <= this.endNumber; i++ ) {
                if ( this.numSelected ) {
                    for ( let j = 0; j < this.numSelected.length; j++ ) {
                        if ( i === (this.numSelected[ j ] * 1) ) {
                            jump = true;
                        }
                    }
                }
                if ( !jump ) {
                    option = document.createElement( "option" );
                    option.value = i;
                    option.text = i;
                    selectList.appendChild( option );
                }
                jump = false;
            }
        } else {
            this.nextDivSelect( document.getElementById(idTxtBefore) )
        }
    },

    nextDivSelect: function ( e ) {
        //this.numSelected.push(e.value);
        if ( this.numSelected && this.numSelected.length <= this.drawNumber - 1) {
            console.log(this.numSelected.length , this.drawNumber)
            this.numSelected.push( e.value );
            document.getElementById( e.id ).disabled = true;
        }
        if ( this.numSelected.length <= this.drawNumber - 1 ) {
            this.divSelect();
        } else {
            this.btnSendInput();
            this.btnSendInputReset()
        }
        console.log(this.numSelected);
    },

    btnSendInput: function () {
        let btn = document.createElement( 'button' );
        btn.id = 'btnSendInput';
        btn.classList.add( 'btn', 'btn-sm', 'btn-primary' );
        btn.style.width = '55px';
        btn.style.height = '55px';
        btn.style.borderRadius = '50%';
        btn.setAttribute( 'onclick', 'lotto.putInput(this)' );
        btn.innerHTML = 'Add';
        this._divSelect.appendChild( btn );
    },
    btnSendInputReset: function () {
        let btn = document.createElement( 'button' );
        btn.id = 'btnSendInputReset';
        btn.classList.add( 'btn', 'btn-sm', 'btn-danger' );
        btn.style.width = '55px';
        btn.style.height = '55px';
        btn.style.marginLeft = '10px';
        btn.style.borderRadius = '50%';
        btn.setAttribute( 'onclick', 'lotto.selectReset(this)' );
        btn.innerHTML = 'reset';
        this._divSelect.appendChild( btn );
    },

    selectReset: function ( e ) {
        let parent = document.getElementById( "btnSendInputReset" ).parentElement;
        while (parent.firstChild) {
            parent.removeChild(parent.lastChild);
        }
        this.numSelected = [];
        this.divSelect();
    },

    putInput: function (  ) {
        if ( this.numSelected ){
            this.allNumbers.push( this.numSelected );
            this.btnHistory();
            this.xSigne();
        }
    },
    //endregion

    //region make signe over the pic
    xSigne: function () {
        // num in case left +19px, top +19px
        //case left +111px top + px
        // const caseBoxWidth = 112;
        // const caseBoxHeight = 152;
        const caseBoxLeft = 15;
        const caseBoxTop = 90;

        const pLeft = 3;
        const pTop = -11;
        //const fSize = 22;
        let loop = 0;
        // remove all before we write
        this._divBigCase.innerHTML = '';

        if ( this.allNumbers ) {
            for ( const table of this.allNumbers ) {
                loop++
                let idName = 'case-' + loop;
                let divCase = document.createElement( 'div' );
                divCase.id = idName;
                divCase.classList.add( 'caseBox' )
                if ( loop <= 6 ) {
                    divCase.style.left = (caseBoxLeft + (loop - 1) * 111) + 'px';
                    divCase.style.top = caseBoxTop + 'px';
                } else {
                    divCase.style.left = (caseBoxLeft + (loop - 7) * 111) + 'px';
                    divCase.style.top = (caseBoxTop + 152) + 'px';
                }
                document.getElementById( 'bigCase' ).appendChild( divCase );
                for ( const num of table ) {
                    let x = num % 6;
                    let y = Math.floor( num / 6 )
                    x === 0 ? x = 6 : y++;

                    let ele = document.createElement( 'div' );
                    ele.innerHTML = 'x';
                    ele.style.left = (pLeft + (x * 19) - 19) + 'px';
                    ele.style.top = (pTop + (y * 19) - 19) + 'px';
                    ele.classList.add( 'xSigne' );
                    divCase.appendChild( ele );
                }
            }
        }
    },
    //endregion
}
lotto.btnGenerator();
lotto.divSelect();
