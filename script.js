/* 
 * Using ES6 Syntax
 * https://facebook.github.io/react/docs/reusable-components.html#es6-classes
 */

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
      activeWord: [],
      activeLetters: [],
      wordsMastered: 0,
      timer: 0,
      wordList: [],
      font: 'sans' };

    this.getWordList = this.getWordList.bind(this);
    this.getRandomInt = this.getRandomInt.bind(this);
    this.getWord = this.getWord.bind(this);
    this.checkEqual = this.checkEqual.bind(this);
    this.timer = this.timer.bind(this);
    this.startGame = this.startGame.bind(this);
    this.rating = this.rating.bind(this);
    this.switchFonts = this.switchFonts.bind(this);
    this.interval;
  }




  componentWillMount() {

    document.addEventListener('keydown', function (e) {
      e.preventDefault();

      // handle backspace and delete
      if (e.which == 46 || e.which == 8) {
        this.setState({
          activeLetters: this.state.activeLetters.slice(0, -1) });

        return true;
      }

      // otherwise add character to array
      let char = String.fromCharCode(e.which);
      let newActiveLetters = this.state.activeLetters;
      newActiveLetters.push(char);
      if (this.checkEqual(newActiveLetters, this.state.activeWord)) {
        this.setState({
          activeWord: this.getWord(),
          activeLetters: [],
          wordsMastered: this.state.wordsMastered + 1 });

      } else
      {
        this.setState({
          activeLetters: newActiveLetters });

      }

    }.bind(this));
  }

  checkEqual(arr1, arr2) {
    if (arr1.length !== arr2.length)
    return false;
    for (var i = arr1.length; i--;) {
      if (arr1[i] !== arr2[i])
      return false;
    }

    return true;
  }

  getRandomInt(min = 0, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }


  timer() {
    let newTime = this.state.timer - 1;
    this.setState({
      timer: newTime });

    if (newTime === 0) {
      window.clearInterval(this.interval);
    }
  }

  rating() {
    if (this.state.wordsMastered < 15) {
      return '';
    } else
    if (this.state.wordsMastered < 25) {
      return '';
    } else
    if (this.state.wordsMastered < 35) {
      return '';
    } else
    if (this.state.wordsMastered < 45) {
      return '';
    } else
    {
      return '';
    }
  }

  startGame() {
    this.setState({
      wordList: this.getWordList() },
    function () {
      let word = this.getWord();
      this.setState({
        activeWord: this.getWord(),
activeLetters: [],
        gameStarted: true,
        wordsMastered: 0,
        timer: 60 });

    });
    ReactDOM.findDOMNode(this).querySelector('.secret-input').focus();

    this.interval = setInterval(this.timer, 1000);
  }

  getWord() {
    let index = this.getRandomInt(0, this.state.wordList.length);
    let wordToUse = this.state.wordList[index];
    let newWordsList = this.state.wordList;
    newWordsList.splice(index, 1);
    this.setState({
      wordList: newWordsList });


    return wordToUse.split('');
  }

  switchFonts() {
    if (this.state.font === 'sans') {
      document.getElementById('app').classList.add('serif');
      this.setState({
        font: 'serif' });

    } else
    {
      document.getElementById('app').classList.remove('serif');
      this.setState({
        font: 'sans' });

    }

  }
  getWordList() {
    const list = [
'DAM VI',
    'VITAMIN C',
    'MATCHA',
    'PHO MAI',
    'TIEN LOI',
'TRUYEN THONG',
    'CO NGOT STEVIA',
    'MANG CAU',
    'DUA HAU BAC HA',
    'DUA LUOI DAO',
    'HAT CHIA HUU CO',
    'TRA DAM DUNG GU',
   
    'TRAN CHAU CO SAN',
   
    'TRA SUA LUAVE',
    'KHONG CHAT BAO QUAN',
    'THANH MAT TU NHIEN',
'TRA SUA TUOI',
'LUAVE',
 
    'CHUAN GU SANH VI',
    'DAM DA AN TUONG',
    'VI NGUYEN BAN',
    'VI NGON THUONG HANG',
    'CHU DU HUONG VI',
    'CHILL CHILL KHO CUONG',
    'TRAN CHAU DAI GION SAN SAT',


   'TRA TRAI CAY HAT CHIA LUAVE',
    'HUONG VI TRA SUA THE GIOI'
    
    
];
    return list;
  }

  render() {

    let letters = [];
    let board;
    this.state.activeWord.map((current, index) => {
      let correct;
      if (this.state.activeLetters[index] === undefined) {
        correct = 'undefined';
      } else
      if (this.state.activeLetters[index] === current) {
        correct = 'true';
      } else
      {
        correct = 'false';
      }
      letters.push( /*#__PURE__*/React.createElement("span", { className: "game-letter", key: index, "data-correct": correct }, current));
    });
    if (!this.state.gameStarted) {
      board = /*#__PURE__*/
      React.createElement("div", { className: "game__board", key: "start" }, /*#__PURE__*/
      React.createElement("p", null, ''), /*#__PURE__*/
      React.createElement("button", { className: "button", onClick: this.startGame }, "Start"), /*#__PURE__*/
      React.createElement("a", { href: "#", onClick: this.switchFonts }, this.state.font === 'sans' ? '' : ''));

    } else
    if (this.state.timer && this.state.gameStarted) {
      board = /*#__PURE__*/
      React.createElement("div", { className: "game__board", key: "inprogress" }, /*#__PURE__*/
      React.createElement("div", { className: "game__score" }, 'SCORE: ' + this.state.wordsMastered), /*#__PURE__*/
      React.createElement(ReactCSSTransitionGroup, { transitionName: "fade", transitionEnterTimeout: 500, transitionLeaveTimeout: 500 }, /*#__PURE__*/
      React.createElement("div", { className: "game__words", key: this.state.activeWord }, letters)), /*#__PURE__*/

      React.createElement("div", { className: "game__timer" }, 'TIMELEFT: ' + this.state.timer));

    } else
    {
      board = /*#__PURE__*/
      React.createElement("div", { className: "game__board", key: "timesup" }, /*#__PURE__*/
      React.createElement("div", { className: "game__words" }, /*#__PURE__*/
      React.createElement("p", null, ''), /*#__PURE__*/
      React.createElement("p", null, 'FINAL SCORE: ' + this.state.wordsMastered, /*#__PURE__*/React.createElement("span", { className: "emoji" }, this.rating())), /*#__PURE__*/
      React.createElement("button", { className: "button", onClick: this.startGame }, 'Play Again')));



    }

    return /*#__PURE__*/(
      React.createElement("div", { className: "game" }, /*#__PURE__*/
      React.createElement(ReactCSSTransitionGroup, { transitionName: "scale", transitionEnterTimeout: 500, transitionLeaveTimeout: 500 },
      board), /*#__PURE__*/

      React.createElement("input", { className: "secret-input", type: "text" })));


  }}


// Render the component in div#app
ReactDOM.render( /*#__PURE__*/React.createElement(Component, null), document.getElementById('app'));