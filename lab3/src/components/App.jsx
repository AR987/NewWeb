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
                            <h4 className="user-select-none text-center">Новости</h4>
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
                            <h4 className="user-select-none text-center">Новости</h4>
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
        fetch("src/api/loadNews.php", {
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
        fetch("src/api/loadNews.php", {
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
                    <div className="p-3 mb-2 bg-light text-dark">
                        <div className="row align-items-center" >
                            {items.map(item => (
                                <ContentContainer key={item.id} id={item.id} title={item.title} picture={item.picture} value={item.value}/>
                            ))}
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
            picture: "",
            value: ""
        };
    }
    
    componentDidMount(){
        this.setState({
            isLoaded: true,
            id: this.props.id,
            title: this.props.title,
            picture: this.props.picture,
            value: this.props.value
        });
    }
    
    render(){
        const{error, isLoaded, id, title, picture, value} = this.state;
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
                        <ContentPicture id={id} picture={picture}/>
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
                        {`Новость №${id}`}
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

class ContentPicture extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            id: "",
            picture: ""
        };
    }
    
    componentDidMount(){
        this.setState({
            isLoaded: true,
            id: this.props.id,
            picture: this.props.picture
        });
    }
    
    render(){
        const{error, isLoaded, id, picture} = this.state;
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
                    <img 
                        className="rounded-2" 
                        src={`${picture}`} 
                        width="128" 
                        height="128" 
                    />
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
            class="btn btn-info" 
            href="comment.html" 
            role="button"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Оставьте отзыв"
            >
            {"Оставить отзыв  "}
        </a>);
}