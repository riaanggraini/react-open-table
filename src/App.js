import React,{Fragment} from 'react';
import { render } from 'react-dom';
import { Container,Card , Segment, Header, Button, Label, List} from 'semantic-ui-react';
import Menu from '../menu-data.json'
import Message from './message'


class App extends React.Component {

    render() {
        const category = ['starters','mains','desserts']
        return (<Container>
             <Segment clearing>
                <Header as='h2' floated='left'>
                Menu
                </Header>
                </Segment>
                    <h3>Click Menu To Order</h3>
                     { category.map((el)=>{
                     return <div key={el}>
                    <h3>{el}</h3>
                    <Card.Group itemsPerRow={4}>
                    < Fragment>     
                    {Menu[el].map((menu) => {
                    return <Card 
                    key={menu.id} onClick={(e) => {
                        this.handleOnClick(e,{menu:menu.id, cat :el, price:menu.price});
                   }}>
                    <Card.Content>
                    <Card.Header>{menu.name}</Card.Header>
                    <Card.Meta>Price : {menu.price}</Card.Meta>
               
                    </Card.Content>
                    </Card>
                  })}
                </Fragment>
               </Card.Group> 
               </div>
             })}
             <br></br>
            Price : <Label tag as='a'>{this.state.price}</Label>
            <Button floated="right"
            content='order now'
            primary
            onClick={this.handleClick}
            ref={this.buttonRef}
            />  
            {this.state.clicked ? <Message success={this.state.success} message={this.state.message}/> : null}   
        </Container> )   
    }

    constructor(props) {
        super(props);
        this.state = {
            menu : [],
            checked: false,
            message: null,
            success: false,
            price :0,
            clicked :false,
            select:true,
        };
        this.handleClick = this.handleClick.bind(this);
      }
      handleClick() {
        this.setState({
          clicked: true
        });
      }
      changePrice (price) {
        this.setState({price: price});
      }
      changeSuccess(success){
          this.setState({success:success})
      }
      changeMessage(message){
        this.setState({message:message})
        }
    handleOnClick(e, menu) {
       
        this.state.menu.push(menu)
     
        let cheseeCakeChoosed = 0
        let prawn = 0
        let salmon = 0
        let mainMenu = false;
        let duplicateItem = 0
        
        let seen = new Set();
        let price = 0
        this.state.menu.some(function(currentObject) {
                if(seen.size === seen.add(currentObject.menu).size) duplicateItem +=1 
                if(currentObject.menu === 11) cheseeCakeChoosed += 1
                if(currentObject.cat === "mains") mainMenu = true
                if(currentObject.menu === 4) prawn = +1
                if(currentObject.menu === 7) salmon = +1
                price += currentObject.price
            });
            this.changePrice(price)
    
        if(this.state.menu.length < 4 ) {
            return this.changeMessage("You must have at least two menus for a person")
        }
        if(duplicateItem > 1){
            return this.changeMessage("You cannot have more than one of the same course")
        }
        if(cheseeCakeChoosed > 1){
            return this.changeMessage("There is only of piece of chesee cake left, chose another menu")
        }
        if(prawn && salmon){
            return this.changeMessage("You cant't choose Prawn cocktail and Salmon fillet in a order")
        }
        if((!mainMenu)){
            return this.changeMessage("You should choose atleast a food in mains menu")
        } 
       this.changeSuccess(true)
       this.changeMessage("Your order will be prepared soon")
      }
}

render(<App />, document.getElementById('root'));
