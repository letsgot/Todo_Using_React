import ReactDom from 'react-dom';
import React from 'react';
import './index.css';

class Add extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            taskdesc: ''
        }
    }

    handleTaskTextChange(e){
        // console.log(this.state.taskdesc);
    //    console.log(e.target.value);
       this.setState({
         taskdesc : e.target.value
       })
       // console.log(this.state.taskdesc);
    }

    handleAddTaskClick(){
        let taskDesc = this.state.taskdesc;
        this.props.handleToCollectTaskInfo(taskDesc);
        this.setState({
            taskdesc : ''
        })
    }



    render(){

        return(
            <form>
                <input type="text" value={this.state.taskdesc} onChange={(e) => this.handleTaskTextChange(e)}/>
                <input type="button" value="Add Task" onClick={()=>this.handleAddTaskClick()}/>
            </form>
        );
    }
}

class TaskList extends React.Component{
    constructor(props){
        super(props);
    }
    
    handleChangeTaskClick(desc){
        this.props.handleForADDInDoneList(desc);
    }

    render(){
        let tasks = this.props.task;
        let list = [];

        for(let i =0;i<tasks.length;i++){
            let task = tasks[i];
            let spanAction;

            if(task.isFinished){
                spanAction = (
                    <span className="material-icons" onClick={()=>this.handleChangeTaskClick(task.desc)}>close</span>
                );
            } else {
                spanAction = (
                    <span className="material-icons"onClick={()=>this.handleChangeTaskClick(task.desc)}>done</span>
                );
            }

            let listItem = (
                <div className="taskDesc" key={i}>
                    <span>{task.desc}</span>
                    {spanAction}
                </div>
            );
            list.push(listItem);
        }

        return(
           <div className={this.props.forStyling}>
               <div className="container">
                  <div className="title">{this.props.purpose}</div>
                  <div className="content">{list}</div>
               </div>
            </div>
        );
    }u
}

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tasks:[
                {
                    desc:"switch off lights",
                    isFinished:true
                },
                {
                    desc:"turn on fans",
                    isFinished:true
                },
                {
                    desc:"make dinner",
                    isFinished:false
                },
                {
                    desc:"make tea",
                    isFinished:false
                }
            ]
        }
    }

    handleNewTask(taskdesc){
        let oldTasks = this.state.tasks.slice();
        oldTasks.push({
            "desc":taskdesc,
            "isFinished":false
        });

        this.setState({
            tasks:oldTasks
        });
    }

    handleChangeFunction(desc){
        let oldTasks = this.state.tasks.slice();
        for(let i =0;i<oldTasks.length;i++){
            let task = oldTasks[i];
            if(task.desc==desc){
                if(task.isFinished){
                    task.isFinished = false;
                }
                else{
                    task.isFinished = true;
                }
            }
        }

        this.setState({
            tasks:oldTasks
        })
    }

    render(){
        let todoTasks = this.state.tasks.filter((obj)=>obj.isFinished==false);
        let doneTasks = this.state.tasks.filter((obj)=>obj.isFinished==true);
        return (
        //    <h1>Hello World</h1>
           <>
              <div className="add-task"> 
              {/* // khabar gyi add task ko ki tu mujhe uski new task ki info de de main task add kr dunga info aai handle new task m gyi  */}
                  <Add handleToCollectTaskInfo={(taskdesc)=>this.handleNewTask(taskdesc)}></Add>  
              </div>
              <div className="task-list">
               <TaskList task={todoTasks} purpose="Task_Todo" forStyling="todo" handleForADDInDoneList={(desc)=>this.handleChangeFunction(desc)}></TaskList>
               <TaskList task={doneTasks} purpose="Task_Finished" forStyling="finished" handleForADDInDoneList={(desc)=>this.handleChangeFunction(desc)}></TaskList>
              </div> 
           </>
        );
    }
}

ReactDom.render(<App></App>,document.getElementById("root"));



/*
phle app m se call lgegi ow bhejega ek attribute or us attribute k return m ek info aayegi jisse state change 
or wo html p render hogi 
*/