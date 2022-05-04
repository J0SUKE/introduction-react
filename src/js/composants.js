// const user = {
//     name:"Jean",
//     age:16
// };

// const element = 
// (
//     <h1 data-age={user.age}>Salut moi c'est {user.name}</h1>
// )

// function age(age) 
// {    
//     if (age>=18) return <h1>Vous etes majeur</h1>;
    
//     return <h1>Vous etes mineur</h1>
// }


//-------------Horloge-------------

const clock = ()=>{
    const element = (
        <div>
            <h1 data-age={user.age}>Salut moi c'est {user.name}</h1>
            <p>Il est actuelement {new Date().toLocaleTimeString()}</p>
        </div>
    )

    ReactDOM.render(element,document.querySelector("#root"))
}
clock();
setInterval(clock, 1000);

//------composants-----------------

function Presentation(props) {
    return <h1>Je m'appelle {props.name} et j'ai {props.age}ans</h1>;
}

function App() {
    return ( 
        <div>
            <Presentation name="Jean" age="20"/>
            <Presentation name="David" age="19"/>
            <Presentation name="Hugo" age="21"/>
        </div>
    )
}

const element = <App/>;


//----separationdes composants-------------

function Navbar(props) {
    return (
        <ul>
            <li type={props.home}>Home</li>
            <li type={props.about}>About</li>
            <li type={props.try}>Try it</li>
        </ul>
    )
}

ReactDOM.render(
    <Navbar 
        home="this is home"
        about="this is about"
        try="this is try"    
    />,root);

function Avatar(props) 
{
    return (
        <img className="Avatar"
        src={props.user.avatarUrl}
        alt={props.user.name}
        />
    );
}

function UserInfo(props) {
return (
    <div className="UserInfo">
    <Avatar user={props.user} />
    <div className="UserInfo-name">
        {props.user.name}
    </div>
    </div>
);
}

function Comment(props) {
    return (
      <div className="Comment">
        <UserInfo user={props.author} />
        <div className="Comment-text">
          {props.text}
        </div>
        <div className="Comment-date">
          {props.date}
        </div>
      </div>
    );
  }

ReactDOM.render(
    <Comment date="20/02/2021" text="un texte" author={{name:"victor",avatarUrl:"./images/img1.jpg"}} />,
    root
)

setInterval(tick, 1000);


class Clock extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {date:new Date()};    
    }
       
    render() // fonction specifique a react (indispensable)
    {
        return (
            <div>
              <h1>Bonjour, monde !</h1>
              <FormatedDate date={this.state.date}/>
            </div>
          );
    }

    componentDidMount() // fonction specifique a react
    {
        this.timerID = setInterval(
            ()=>this.tick(),
            1000
        );
    }

    componentWillUnmount() // fonction specifique a react
    {
        clearInterval(this.timerID);
    }

    tick()
    {
        this.setState({
            date:new Date()
        });
    }
}

function FormatedDate(props) {
    return (<h2>Il est {props.date.toLocaleTimeString()}.</h2>)   
}

class ActionLink extends React.Component
{
    render()
    {
        return (
            <a href={this.props.destination} onClick={this.handleClick}>{this.props.mesg}</a>
        )
    }
    handleClick(e)
    {
        e.preventDefault();
        console.log("link clicked");
    }
}

class Toggle extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {isTogglOn:false};
    }
    
    handleClick()
    {
        this.setState(state=>{
            return {isTogglOn:!state.isTogglOn}
        })
    }
    
    render()
    {
        return (
            <button onClick={this.handleClick.bind(this)}>{this.state.isTogglOn ? "ON":"OFF"}</button>
        )
    }
}

function Greeting(props) {
    const isLoggedIn=props.isLoggedIn;
    if (isLoggedIn) {
        return <h1>Bienvenue !</h1>;
    }
    return <h1>Veuillez vous inscrire.</h1>;
}


function LoginButton(props) {
    return (
        <button onClick={props.onClick}>Login</button>
    )
}
function LogoutButton(props) {
    return (
        <button onClick={props.onClick}>Login out</button>
    )
}

class LoginControls extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            isLoggedIn:false,
        }
        this.handleClick=this.handleClick.bind(this);
    }
    render()
    {
        const isLoggedIn=this.state.isLoggedIn;
        
        let button = ( isLoggedIn ? <LogoutButton onClick={this.handleClick}/> : <LoginButton onClick={this.handleClick}/>);

        return (
            <div>
                <Greeting isLoggedIn={isLoggedIn}/>
                {button}
            </div>
        )            
    }
    handleClick()
    {
        this.setState((state)=>{
            return ({
                isLoggedIn:!state.isLoggedIn
            })
        })
    }
}

class MailBox extends React.Component
{
    constructor(props)
    {
        super(props);
        this.mails = [...props.mails];
    }

    render()
    {
        return(
            <div>
                <h1>Bonjour !</h1>
                {this.mails.length > 0 && <p>Vous avez {this.mails.length} nouveaux messages</p> }
            </div>
        )
    }
}

const messages = ["salut"];

ReactDOM.render(
    <MailBox mails={messages}/>,
    root
)

const numbers = [1,2,3,4,5,6];

const LiItems = numbers.map((number)=>(
                                        <li key={number.toString()} id={number}>{number}</li>
                                    ));

ReactDOM.render(
    <ul>{LiItems}</ul>,
    root
)

class NameForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            value:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render()
    {
        // make the submit button update the state 
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" value={this.state.value} onChange={this.handleChange}/>
                <input type="submit" value="submit name"/>
            </form>
        )
    }

    handleChange(e)
    {
        this.setState({
            value:e.target.value
        })
    }

    handleSubmit(e)
    {
        e.preventDefault();
        alert("the name was submitted : "+this.state.value);
    }
}
