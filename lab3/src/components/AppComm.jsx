class Application extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false
        };
    }
    
    componentDidMount(){
        this.setState({
            isLoaded: true
        });
    }
    
    render(){
        const{error, isLoaded} = this.state;
        if (error) {
            return(
                <Error error={error.message}/>
            );
        } 
        else if (!isLoaded) {
            return <Load/>;
        }
        else{
            return(
                <div className="container" id="application">
                    <Header/>
                    <Content/>
                    <Footer/>
                </div>
            );
        }
    }
}

function Error(props){
    return(
        <div className="container">
            <div className="d-flex justify-content-center">
                <strong>Ошибка: {props.error}</strong>
                <div className="spinner-border spinner-border-sm text-danger" role="status">
                    <span className="visually-hidden">Загрузка...</span>
                </div>
            </div>  
        </div>
    );
}

function Load(props){
    return(
        <div className="container">
            <div className="d-flex justify-content-center">
                <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Загрузка...</span>
                </div>
            </div>  
        </div>
    );
}

function Header(props){
    return(
        <div className="header sticky-top" id="header">
            <div className="container"> 
                <div className="row">
                    <div className="col">
                        <div className="p-3 mb-2 bg-secondary text-dark">
                            <h4 className="user-select-none text-center">Отзыв</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Footer(props){
    return(
        <div className="footer" id="footer">
            <div className="container sticky-bottom"> 
                <div className="row">
                    <div className="col">
                        <div className="p-3 mb-2 bg-secondary text-dark">
                            <h4 className="user-select-none text-center">Отзыв</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

class Content extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            cRange: 5,
            sRange: 0,
            eRange: 5
        }
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(){
        const{cRange, eRange, sRange} = this.state;
        this.setState({
            eRange: eRange+cRange
        });
        let jData = {
            sRange: sRange,
            eRange: eRange
        };
        fetch("src/api/loadComm.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, 
            body: JSON.stringify(jData)
        })
        .then(response => response.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }
    
    componentDidMount(){
        const{cRange, eRange, sRange} = this.state;
        this.setState({
            eRange: eRange+cRange
        });
        let jData = {
            sRange: sRange,
            eRange: eRange
        };
        fetch("src/api/loadComm.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, 
            body: JSON.stringify(jData)
        })
        .then(response => response.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }
    
    render(){
        const{error, isLoaded, items} = this.state;
        if (error) {
            return(
                <Error error={error.message}/>
            );
        } 
        else if (!isLoaded) {
            return <Load/>;
        }
        else{
            return(
                <div className="container" id="content">
                    <ContentContainerSave/>
                    <div className="container">
                    <div className="row align-items-center">
                        {items.map(item => (
                            <ContentContainer key={item.id} id={item.id} title={item.title} mail={item.mail} value={item.value}/>
                        ))}
                    </div>
                    </div>
                    <div className="container fixed-bottom">
                        <div className="row justify-content-end" >
                            <div className="col-sm-3">
                                <ButtonComment/>
                            </div>
                            <div className="col-sm-3">
                                <ButtonAgain handleClick={this.handleClick}/>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

class ContentContainerSave extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            title: "",
            mail: "",
            value: ""
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleClick(){
        event.preventDefault();
        const {title, mail, value, pR} = this.state;
        let boolN = false;let boolE = false;let boolV = false;
        if(!((title.trim().length==="0")||(title.trim()===""))){boolN = true;}else{boolN = false;}
        if(!((mail.trim().length==="0")||(mail.trim()===""))&&(mail.includes('@'))){boolE = true;}else{boolE = false;}
        if(!((value.trim().length==="0")||(value.trim()===""))){boolV = true;}else{boolV = false;}
        if(boolN&&boolE&&boolV==true){
            let jData = {
                title: title,
                mail: mail,
                value: value
            };
            fetch("src/api/saveComm.php", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }, 
                body: JSON.stringify(jData)
            })
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
            alert("Отправлено");
        }else{
            alert("Не отправлено");
        }
    }
    
    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
    }
    
    componentDidMount(){
        this.setState({
            isLoaded: true
        });
    }
    
    render(){
        const{error, isLoaded, id, title, mail, value} = this.state;
        if (error) {
            return(
                <Error error={error.message}/>
            );
        } 
        else if (!isLoaded) {
            return <Load/>;
        }
        else{
            return(
                <div className="container">
                    <form autocomplete="off" className="row needs-validation" onSubmit={this.handleClick}>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">
                                Введите имя
                            </span>
                            <input 
                                type="text" 
                                id="title"
                                className="form-control" 
                                name="title"
                                placeholder="Фамилия Имя Отчество" 
                                aria-label="title" 
                                aria-describedby="basic-addon1"
                                required
                                value={title}
                                pattern="[A-Za-z]{4,16}"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon2">
                                Введите почту
                            </span>
                            <input 
                                type="email" 
                                id="mail"
                                className="form-control" 
                                name="mail"
                                placeholder="example@example.com"
                                pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/" 
                                aria-label="mail" 
                                aria-describedby="basic-addon2"
                                required
                                value={mail}
                                pattern="[A-Za-z]{4,16}"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <span class="input-group-text">
                                Введите комментарий
                            </span>
                            <textarea 
                                class="form-control" 
                                id="text"
                                name="value"
                                value={value}
                                required
                                aria-label="With textarea"
                                placeholder="Комментарий"
                                onChange={this.handleChange}
                                >
                            </textarea>
                        </div>
                        <div className="input-group mb-3">
                            <button 
                                type="button" 
                                className="btn btn-success"
                                onClick={this.handleClick}
                            >
                                Оставить комментарий
                            </button>
                        </div>
                    </form>
                </div> 
            );
        }
    }
}

class ContentContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            id: "",
            title: "",
            mail: "",
            value: ""
        };
    }
    
    componentDidMount(){
        this.setState({
            isLoaded: true,
            id: this.props.id,
            title: this.props.title,
            mail: this.props.mail,
            value: this.props.value
        });
    }
    
    render(){
        const{error, isLoaded, id, title, mail, value} = this.state;
        if (error) {
            return(
                <Error error={error.message}/>
            );
        } 
        else if (!isLoaded) {
            return <Load/>;
        }
        else{
            return(
                <div className="container" id={`data${id}`}>
                    <div class="row align-items-start">
                        <ContentId id={id}/>
                    </div> 
                    <div class="row align-items-start">
                        <ContentTitle id={id} title={title}/>
                    </div>
                    <div class="row align-items-start">
                        <ContentMail id={id} mail={mail}/>
                        <ContentValue id={id} value={value}/>
                    </div>
                </div> 
            );
        }
    }
}

class ContentId extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            id: ""
        };
    }
    
    componentDidMount(){
        this.setState({
            isLoaded: true,
            id: this.props.id
        });
    }
    
    render(){
        const{error, isLoaded, id} = this.state;
        if (error) {
            return(
                <Error error={error.message}/>
            );
        } 
        else if (!isLoaded) {
            return <Load/>;
        }
        else{
            return(
                <div className="col-sm" id={`data${id}`}>
                    <h4 className="text-dark user-select-none">
                        {`Комментарий №${id}`}
                    </h4>
                </div> 
            );
        }
    }
}

class ContentTitle extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            id: "",
            title: ""
        };
    }
    
    componentDidMount(){
        this.setState({
            isLoaded: true,
            id: this.props.id,
            title: this.props.title
        });
    }
    
    render(){
        const{error, isLoaded, id, title} = this.state;
        if (error) {
            return(
                <Error error={error.message}/>
            );
        } 
        else if (!isLoaded) {
            return <Load/>;
        }
        else{
            return(
                <div className="col-sm" id={`data${id}`}>
                    <h4 className="text-dark user-select-none">
                        {`${title}`}
                    </h4>
                </div>  
            );
        }
    }
}

class ContentMail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            id: "",
            mail: ""
        };
    }
    
    componentDidMount(){
        this.setState({
            isLoaded: true,
            id: this.props.id,
            mail: this.props.mail
        });
    }
    
    render(){
        const{error, isLoaded, id, mail} = this.state;
        if (error) {
            return(
                <Error error={error.message}/>
            );
        } 
        else if (!isLoaded) {
            return <Load/>;
        }
        else{
            return(
                <div className="col-sm" id={`data${id}`}>
                    <h4 className="text-dark user-select-none">
                    {`${mail}`}
                    </h4>
                </div> 
            );
        }
    }
}

class ContentValue extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            id: "",
            value: ""
        };
    }
    
    componentDidMount(){
        this.setState({
            isLoaded: true,
            id: this.props.id,
            value: this.props.value
        });
    }
    
    render(){
        const{error, isLoaded, id, value} = this.state;
        if (error) {
            return(
                <Error error={error.message}/>
            );
        } 
        else if (!isLoaded) {
            return <Load/>;
        }
        else{
            return(
                <div className="col-sm" id={`data${id}`}>
                    <h4 className="text-dark user-select-none">
                        Описание:
                    </h4>
                    <p className="text-dark user-select-none">
                        {value}
                    </p>
                </div>
            );
        }
    }
}

function ButtonAgain(props){
    return(
        <button
            type="button"
            className="btn btn-success"
            onClick={props.handleClick}
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Загрузить еще несколько элементов"
            >
            {"Загрузить новые  "}
        </button>
    );
}

function ButtonComment(props){
    return (
        <a 
            class="btn btn-danger" 
            href="index.html" 
            role="button"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Перейти к новостям"
            >
            {"Перейти к новостям  "}
        </a>);
}