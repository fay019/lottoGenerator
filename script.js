//region our lotto Generator Object
lotto = {
    //region the variable section
    userGenerateNumber:0,
    fromUser: false,
    startNumber:1,
    endNumber:45,
    drawNumber:6,
    maxDrawCase:12,
    numSelected:[],
    numbers:[],
    allNumbers:[],
    numberPrint:0,
    _divNumbers:document.querySelectorAll( '#numbers' )[ 0 ],
    _divPrintHistory:document.querySelectorAll( '#printHistory' )[ 0 ],
    _divHistory:document.querySelectorAll( '#history' )[ 0 ],
    _divClearScreen:document.querySelectorAll( '#clearScreen' )[ 0 ],
    _divSelect:document.querySelectorAll( '#select' )[ 0 ],
    _divBigCase:document.querySelectorAll( '#bigCase' )[ 0 ],
    _divNumGene:document.querySelectorAll( '#numGene' )[ 0 ],
    _btnHistory:document.getElementsByClassName( 'btnHistory' ),
    _btnClearScreen:document.getElementsByClassName( 'btnClearScreen' ),
    //endregion

    //region westart our generator from here
    /**
     *
     * @param size
     * @param numStart
     * @param numEnd
     */
    startGenerate:function ( size, numStart, numEnd ) {
        let userSelect = document.getElementById( 'generator-select' )
        let value = userSelect.value * 1
        this.userGenerateNumber = this.userGenerateNumber + value;
        if ( this.userGenerateNumber < this.maxDrawCase ) {
            this.generatorTime();
        } else { // else we remove all select
            userSelect.remove();
            this._divSelect.innerHTML = '';
        }
        console.log(value)
        if ( !this.fromUser ){
            for ( let i = 0; i < value; i++ ) {
                this.generator( size, numStart, numEnd )
            }
        } else {
            this.fromUser = false;
            this.userGenerateNumber++
        }
    },
    //endregion

    //region number generator without duplicate and call function
    /**
     * call order function
     * call print function
     * call fill function
     * call draw function
     *
     * @param size
     * @param numStart
     * @param numEnd
     */
    generator:function ( size, numStart, numEnd ) {
        this.numbers = []
        if ( this.allNumbers && this.allNumbers.length >= 11 ) {
            document.getElementById( 'btnGenerator' ).classList.add( 'disabled' );
            document.getElementById( 'btnGenerator' ).innerHTML = 'You make 12';
        }
        this.divChildRemove( this._divNumbers )
        for ( let i = 0; i < size; i++ ) {
            let add = true;
            const randomNumber = Math.floor( Math.random() * numEnd ) + numStart;
            for ( let y = 0; y < numEnd; y++ ) {
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
        // write in div history  // 2 time // 1st to refresh and 2nd return to the initial display
        this.printHistory();
        this.printHistory();
    },
    //endregion

    //region function to order the Array from smallest to largest
    /**
     * order the numbers from smallest to largest
     * @param numbers
     */
    numOrder:function ( numbers ) {
        let bigNumber = 0;
        for ( let m = 0; m < numbers.length; m++ ) {
            for ( let n = m + 1; n < numbers.length; n++ ) {
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


    //region Description we fill our array with all numbers we generated or add + add btn history and screen cleaner
    /**
     * we fill our array with all numbers we generated or add
     * we print our button for  history and screen cleaner
     * @param numbers
     */
    setAllNumbers:function ( numbers ) {
        console.log( numbers )
        // put the history btn
        this.allNumbers.length <= 0 ? this.btnHistory() : '';
        this.allNumbers.length <= 0 ? this.btnClearScreen() : '';
        this.allNumbers.push( numbers );
    },
    //endregion

    //region Select generator for the user input
    /**
     *
     */
    generatorTime:function () {
        let selectDiv = document.getElementById( 'generator-select' );
        if ( document.getElementById( 'generator-select' ) ) {
            selectDiv.remove();
        }
        selectDiv = this._e( 'select' );
        selectDiv.id = "generator-select";
        this._divNumGene.appendChild( selectDiv );
        let maxGenerate = this.maxDrawCase - this.userGenerateNumber;

        // Create and append the options
        for ( let i = 0; i < maxGenerate; i++ ) {
            let option = this._e( "option" );
            option.value = i + 1;
            option.text = i + 1;
            selectDiv.appendChild( option );
        }
    },
    //endregion

    //region creat button for generator
    /**
     * make button generator
     */
    btnGenerator:function () {
        this.generatorTime();
        let btn = this._e( 'button' );
        let txt = 'lotto.startGenerate( ' + this.drawNumber + ',' + this.startNumber + ',' + this.endNumber + ');'
        btn.id = 'btnGenerator';
        btn.classList.add( 'btn', 'btn-sm', 'btn-primary' );
        btn.style.margin = '20px'
        btn.style.borderRadius = '15px'
        btn.setAttribute( 'onclick', txt )
        btn.innerHTML = 'Generate'
        this._divNumGene.appendChild( btn );
    },
    //endregion

    //region printer // for last generated number or for history div
    /**
     * display array numbers, then we add the separator '-' between the numbers
     * @param numbers
     * @param parent
     */
    printNum:function ( numbers, parent ) {
        let divs = document.querySelectorAll( '#' + parent )[ 0 ];
        let div = this._e( 'div' );
        let divClass = 'num-' + parent;
        div.classList.add( divClass );
        div.innerHTML = ( parent === 'numbers' ) ? '<br>' + numbers.join( " - " ) : numbers.join( " - " );
        divs.appendChild( div )
    },
    //endregion

    //region History Section button and action
    /**
     * make button history
     */
    btnHistory:function () {
        let btn = this._e( 'button' );
        btn.id = 'btnHistory';
        btn.classList.add( 'btn', 'btn-sm', 'btn-success', 'btnHistory' );
        btn.style.margin = '20px'
        btn.style.borderRadius = '15px'
        btn.setAttribute( 'onclick', 'lotto.printHistory();' )
        btn.innerHTML = 'History'
        this._divHistory.appendChild( btn );
    },

    /**
     * print the history of all numbers
     */
    printHistory:function () {
        this.divChildRemove( this._divPrintHistory );
        this._divPrintHistory.innerHTML = '<span class="print-text">History</span><br>';
        for ( let i = 0; i < this.allNumbers.length; i++ ) {
            this.printNum( this.allNumbers[ i ], 'printHistory' );
        }
        if ( this._divPrintHistory.classList.contains( 'd-none' ) ) {
            this._divPrintHistory.classList.remove( 'd-none' );
        } else {
            this._divPrintHistory.classList.add( 'd-none' );
        }
    },
    //endregion

    //region child remover
    /**
     * if the div has child we remove all what in side
     * @param parent
     */
    divChildRemove:function ( parent ) {
        if ( parent.hasChildNodes() ) {
            parent.innerHTML = '';
        }
    },
    //endregion

    //region edit section // not make it at this moment
    /**
     * we edit our array  in X position
     * in the todo list
     * @param pos
     * @param numbers
     */
    editNum:function ( pos, numbers ) {
        this.allNumbers[ pos ] = numbers;
    },
    //endregion

    //region Clear function button and action
    /**
     * creat button Clear Screen
     */
    btnClearScreen:function () {
        let btn = this._e( 'button' );
        btn.id = 'btnClearScreen';
        btn.classList.add( 'btn', 'btn-sm', 'btn-danger', 'btnClearScreen' );
        btn.style.margin = '20px'
        btn.style.borderRadius = '15px'
        btn.setAttribute( 'onclick', 'lotto.clearScreen();' )
        btn.innerHTML = 'Clear all'
        this._divClearScreen.appendChild( btn );
    },
    //
    /**
     * Clear all data and texts on the screen
     */
    clearScreen:function () {
        this.numbers = [];
        this.allNumbers = [];
        this.numberPrint = 0;
        this._divNumbers.innerHTML = '';
        this._divPrintHistory.innerHTML = '';
        !this._divPrintHistory.classList.contains( 'd-none' ) ? this._divPrintHistory.classList.add( 'd-none' ) : '';
        this._divHistory.innerHTML = '';
        this._divClearScreen.innerHTML = '';
        this._divBigCase.innerHTML = '';
        this._divNumGene.innerHTML = '';
        this.userGenerateNumber = 0;
        this.btnSendInputReset();
        this.selectedReset();
        this.btnGenerator();
    },
    //endregion

    //region input Select section
    /**
     *
     */
    divSelect:function () {
        let jump = false;
        let idTxt = 'select-' + this.numSelected.length + 1;
        let selectList = this._e( 'select' )

        if ( this.numSelected.length + 1 <= this.drawNumber ) {
            selectList.id = idTxt
            selectList.setAttribute( 'name', idTxt );
            selectList.setAttribute( 'onchange', 'lotto.nextDivSelect(this)' );
            selectList.classList.add( 'select-list' );
            this._divSelect.appendChild( selectList );
            let option = this._e( 'option' );
            option.text = '...';
            selectList.appendChild( option );
            for ( let i = this.startNumber; i <= this.endNumber; i++ ) {
                if ( this.numSelected ) {
                    for ( let j = 0; j < this.numSelected.length; j++ ) {
                        if ( i === ( this.numSelected[ j ] * 1 ) ) {
                            jump = true;
                        }
                    }
                }
                if ( !jump ) {
                    option = this._e( 'option' );
                    option.value = i;
                    option.text = i;
                    selectList.appendChild( option );
                }
                jump = false;
            }
        }
    },

    /**
     *
     * @param e
     */
    nextDivSelect:function ( e ) {
        //this.numSelected.push(e.value);
        if ( this.numSelected && this.numSelected.length <= this.drawNumber - 1 ) {
            this.numSelected.push( e.value );
            document.getElementById( e.id ).disabled = true;
        }
        if ( this.numSelected.length <= this.drawNumber - 1 ) {
            this.divSelect();
        } else {
            this.btnSendInput();
            this.btnSendInputReset()
        }
    },

    /**
     * creat button add (send)
     */
    btnSendInput:function () {
        let btn = this._e( 'button' );
        btn.id = 'btnSendInput';
        btn.classList.add( 'btn', 'btn-sm', 'btn-primary' );
        btn.style.width = '55px';
        btn.style.height = '55px';
        btn.style.borderRadius = '50%';
        btn.setAttribute( 'onclick', 'lotto.putInput(this)' );
        btn.innerHTML = 'Add';
        this._divSelect.appendChild( btn );
    },

    /**
     * creat button reset
     */
    btnSendInputReset:function () {
        let btn = this._e( 'button' );
        btn.id = 'btnSendInputReset';
        btn.classList.add( 'btn', 'btn-sm', 'btn-danger' );
        btn.style.width = '55px';
        btn.style.height = '55px';
        btn.style.marginLeft = '10px';
        btn.style.borderRadius = '50%';
        btn.setAttribute( 'onclick', 'lotto.selectedReset(this)' );
        btn.innerHTML = 'reset';
        this._divSelect.appendChild( btn );
    },

    /**
     * remove all children and clear array
     * restart from the 1st ball
     */
    selectedReset:function () {
        let parent = document.getElementById( "btnSendInputReset" ).parentElement;
        while ( parent.firstChild ) {
            parent.removeChild( parent.lastChild );
        }
        this.numSelected = [];
        this.divSelect();
    },

    /**
     * push our selected number to the array
     * we call xSigne function to make the tick
     * reset the array and add 'add' and reset button
     * print on history
     */
    putInput:function () {
        if ( this.numSelected ) {
            this.allNumbers.push( this.numSelected );
            this.xSigne();
            this.selectedReset();
            this._btnHistory && this._btnHistory.length < 1 ? this.btnHistory() : '';
            this._btnClearScreen && this._btnClearScreen.length < 1 ? this.btnClearScreen() : '';
            // write in div history  // 2 time // 1st to refresh and 2nd return to the initial display
            this.printHistory();
            this.printHistory();
            this.fromUser = true;
            //this.userGenerateNumber += 1 ;
            this.startGenerate( this.drawNumber, this.startNumber, this.endNumber);
        }
    },
    //endregion

    //region make signe over the pic
    /**
     * we tick our array numbers on the Lotto grid (image)
     */
    xSigne:function () {
        // num in case left +19px, top +19px
        //case left +111px top + 152px
        const caseBoxLeft = 15;
        const caseBoxTop = 90;

        const pLeft = 3;
        const pTop = -11;
        let loop = 0;
        // remove all before we write
        this._divBigCase.innerHTML = '';

        if ( this.allNumbers ) {
            for ( const table of this.allNumbers ) {
                loop++;
                let idName = 'case-' + loop;
                let divCase = this._e( 'div' );
                divCase.id = idName;
                divCase.classList.add( 'caseBox' );
                if ( loop <= 6 ) {
                    divCase.style.left = ( caseBoxLeft + ( loop - 1 ) * 111 ) + 'px';
                    divCase.style.top = caseBoxTop + 'px';
                } else {
                    divCase.style.left = ( caseBoxLeft + ( loop - 7 ) * 111 ) + 'px';
                    divCase.style.top = ( caseBoxTop + 152 ) + 'px';
                }
                this._divBigCase.appendChild( divCase );
                for ( const num of table ) {
                    let x = num % 6;
                    let y = Math.floor( num / 6 )
                    x === 0 ? x = 6 : y++;
                    let ele = this._e( 'div' );
                    ele.innerHTML = 'x';
                    ele.style.left = ( pLeft + ( x * 19 ) - 19 ) + 'px';
                    ele.style.top = ( pTop + ( y * 19 ) - 19 ) + 'px';
                    ele.classList.add( 'xSigne' );
                    divCase.appendChild( ele );
                }
            }
        }
    },
    //endregion

    //region lib creat element
    /**
     *
     * @param e
     * @returns {*} // element
     * @private
     */
    _e:function ( e ) {
        return document.createElement( e );
    }
    //endregion
}
//endregion

lotto.btnGenerator();
lotto.divSelect();
