var OrderItem = function(itemName){
	this.itemName = itemName;
	this.quantity = 0;
};

OrderItem.prototype.addOne = function() {
	this.quantity++;
};

var Transition = React.addons.CSSTransitionGroup;

var DaContainer = React.createClass({
	getInitialState: function() {
		return {
			items: [
				new OrderItem("Kopi C"),
				new OrderItem("Teh C"),
				new OrderItem("Milo"),
				new OrderItem("Barley"),
				new OrderItem("Yuan Yang"),
				new OrderItem("Coke Light"),
				new OrderItem("Coke")
			],
			isAddEntryMode: false
		};
	},

	handleItemClick: function(itemId) {
		this.setState(function(previousState, currentProps) {
			var items = previousState.items.slice();
			console.log(itemId);
			console.log(items[itemId]);
			items[parseInt(itemId)].addOne();
			return {
					items: items
				};
			});
	},

	handleInitAddItem: function(){
		this.setState(function(previousState, currentProps) {
			return {
					isAddEntryMode: true
				};
			});
	},

	handleAddItem: function(itemName){
		this.setState(function(previousState, currentProps) {
			var items = previousState.items.slice();
			items.push(new OrderItem(itemName));
			return {
					items: items
				};
			});
	},

	render: function(){
		return (
			<div>
				<HeadingContainer />
				<OrderContainer items={this.state.items} 
								onItemClick={this.handleItemClick} 
								onInitAddItem={this.handleInitAddItem} />
				<Transition transitionName="question-container">
					{this.state.isAddEntryMode ? 
						<QuestionContainer onAddItem={this.handAddItem}/>
										   : null
					}
				</Transition>
			</div>
			);
	}
});

var HeadingContainer = React.createClass({
	render: function(){
		return (
			<div className="heading-container">
				<div className="timer-container">
					Day: <span >{new Date().toJSON().slice(0,10)}</span>
				</div>
			</div>
		);
	}
});

var OrderContainer = React.createClass({
	render: function(){
		var self = this, items = this.props.items;
		return (
			<div className="order-container">
				<div className="order-container-title">Orders:</div>
					{items.map(function(item, index) {
						return (<div className="item-container-outer item-mask">
							<button className="item-container" onClick={self.props.onItemClick.bind(this, index)}>
							<p>{item.itemName}</p>
							<p className="item-quantity">Qty: {item.quantity}</p>
							</button></div>
							);
					})}
					<div className="item-container-outer item-mask">
							<button className="item-container">
							<p>+</p>
							</button></div>
			</div>
		);
	}
});

React.render(<DaContainer />, document.getElementById('container'));