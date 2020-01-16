import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowLeft, faArrowRight, faArrowUp, faFlag } from '@fortawesome/free-solid-svg-icons'


class App extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      blockStyle: 'block',
      playerPos: {
        x: 0,
        y: 0,
      },
      maze: [],
    }
  }

  Sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  componentDidMount(){
    this.mazeInitializer(0,0);
  }

  mazeInitializer = (i,j) => {
    var endPoint = new Object
    endPoint.x = i
    endPoint.y = j

    var maze = [];

    

    var step = 0
    while(step != 9){
      var side = Math.floor(Math.random() * 4)
      //0 - left
      //1 - right
      //2 - up
      //3 - down
      if(side == 0)
      {
        if(endPoint.y > 0)
        {
          maze.push(side)
          endPoint.y--
          step++
        }
      }
      else if(side == 1){
        if(endPoint.y < 2){
          maze.push(side)
          endPoint.y++
          step++
        }
      }
      else if(side == 2){
        if(endPoint.x > 0){
          maze.push(side)
          endPoint.x--
          step++
        }
      }
      else if(side == 3){
        if(endPoint.x < 2){
          maze.push(side)
          endPoint.x++
          step++
        }
      }
    }
    console.log(maze, endPoint)
    this.setState({endPoint: endPoint, maze: maze})
  }

  onBlockClick = (i, j) => {
    var endPoint = this.state.endPoint
    var win = false
    if(i == endPoint.x && j == endPoint.y){
       this.setState({blockStyle: "blockWin", playerPos: endPoint})
       this.mazeInitializer(endPoint.x, endPoint.y)
       win = true
    }
    else
      this.setState({blockStyle: "blockLoose"})
    this.Sleep(2000).then(()=> {
        this.setState({blockStyle: "block"})
    })
  }

  render(){

    var gameMap = [
      [
        {},{},{}
      ],
      [
        {},{},{}
      ],
      [
        {},{},{}
      ]
    ]

    return (
      <div className="App">
        <div className={"game"}>
          {gameMap.map((row, i) => (
            <div className={"row"}>
              {row.map((block, j) => (
                <div className={this.state.blockStyle} onClick={() => this.onBlockClick(i,j)}>
                  {this.state.playerPos.x == i && this.state.playerPos.y == j ? 
                  <FontAwesomeIcon icon={faFlag} size='2x'/> : 
                  ""}
                </div>
              ))}
            </div>
          ))}
        </div>
        <h1>Maze</h1>
        <div className={"gameRules"}>
          {this.state.maze.map((step,id)=>{
            //0 - left
            //1 - right
            //2 - up
            //3 - down
            if(step == 0)
              return(<FontAwesomeIcon icon={faArrowLeft} size='4x'  className={'arrowBlock'}/>)
            else if(step == 1)
              return(<FontAwesomeIcon icon={faArrowRight} size='4x'  className={'arrowBlock'}/>)
            else if(step == 2)
              return(<FontAwesomeIcon icon={faArrowUp} size='4x' className={'arrowBlock'}/>)
            else
              return(<FontAwesomeIcon icon={faArrowDown} size='4x' className={'arrowBlock'}/>)
          })}          
        </div>
      </div>
    );
  }
}

export default App;
