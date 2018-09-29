# N.T.E.  principles

## Table of centent

- [5.7.2018 first draft]()
- [21.9.2018 second conjecture]()
- [28.9.2018 third conjecture]()

      ------------------------------------------------------------

### 5.7.2018 first draft

NTE (in the future ITE (intuitive template engine)) want hide complexity without obly
the developer to learn ng-* data-* $scope, or other particular names or paradigm.

Life motive: "deduct the bonds from the names and behavior from the types".

We like examples as 

	<input value="@myVariableName">.
	<p>My name is @myVariableName</p>.

But a more complex example require a lebel than can be:

	label:<input....>

or

	<label><input ...>label</label>

depending on UI

So a common tag can be:

	<input value="@myVarName" label="label:">

that require a input(node) function or a 

	<template name="input">... 
	
to be rendered into one or other form.
Same as <p> require a p(node) to be rendered as <p>My name is <span>@MyVarName</span></p>.

But when the complexity evolve to 3rd level, things must be grouped and named:

#### Presentation layer 

```html

<!-- 
	attributes not allowed, because this can be rendered both client or server side
	depending on how we want balance performances
-->

<person>
	<fName></fname>
	<lName></lname>
	<bDay><bDay>
	<fullName></fullName>
	<splitNames></splitNames>
	<save></save>
</person>

<persons></persons>

<script>
	
	var person = {
		fName: "?",
		lName: "Zaglio",
		bDay: "1972-02-01",
		...
		// functions will wrapped and param names used to link controls to update
		fullName: function(fName,lName) = { return fName+" "+lName},
		splitNames: function(fName,lName) { split into fName,lName },
		save: function() { ajax calls }
	}

	var persons = []

	nte.viewComponents(
		{
			// maybe an external JSON managed by UI console/gui
			person: {
				lName: {
					template: "input",
					label: "Last name"
				},
				save: {
					class:"btn btn-default"
				},
			},

			persons: {
				template: "table"
			}

		}
	)
	
	person.fName="Stefano"
	// person.viewUpdate() -->automatically generated&called 1st time by engine

</script>
```

#### Local components layer

```html

<template name="fName>
	<input label="First Name" value="@fName">
</template>

<template name="bDay>
	<input label="Birthday" type="date" value="@bDay">
</template>

<template name="fullName">
	Full name:@fullName
</template>

<template name="save">
	<button></button>
</template>
```

#### Global component layer

```html
<template name="input">
	@label:<input value="@value" type="@type|text">
</template>
```

#### Engine

```javascript
nte.input = function(node,data) {
	...
	node.addEventListener("change",function(ev){
		eval(node.getAttribute("value") +"='" + ev.value + "'")
	}
	...
}
```

### 21.9.2018 second conjecture

When we start with:

	<input type="text" id="pay" Placeholder="...">

we continue to define/expand things with:

	<input type="text" id="pay" Placeholder="..." SubType="money" ... >

and we need to encapsulate in a concept:

	<money id="pay" Placeholder="..." min="..." max="..." ...></money>
	
or

	<money ... >@pay</money>

In MSAccess we define a table Person(name text,pay currency) and it automatically generate a form or a table view.
Then we set properties of single control automatically related to fields.
So create a prototype is fast as much as review it.

What if we KISS and DRY:

	<input id="pay">

and into a .js:

	...
	pay: {
		type: "money",
		placeholder: "....",
		min: "...",
		max: "...",
		...
	}
	
and into a widgets.money.html:

	<widget name="money">
		<input id="@id" type="@type">
	</widget>

In the old way of CASE, we can complete and/or transform each other to obtain a "normalized" form in any moment.

So as CSS is a mirror of HTML for the representation aspect, JSON become a mirror for the behaviour aspect.

Can be this an application of OOAD concepts? 

But what appen if tomorrow the IETF define a new standard where extra attributes change meaning?

Do we really need some "ng-", "v-" or "data-" prefix to keep us safe? No, because the meaning is detached!

Was this the pourpuse of the OOP? Data + Process = meaning? Is this really useful and practical?


### 28.9.2018 third conjecture

#### todoApp.html 

```html
<todoApp>

	<h1>Todo list</h1>

	<text>todo?</text><add>Add todo</add>

	<todos>

		<li>
			<done></done><description></description><remove></remove>
		</li>

	</todos>

</todoApp>
```

#### todoApp.js 

```javascript
todoApp: {

	data: [],

	add: function() {
		todos.value.push({
			done: false,
			description: text.value
			}
		)
		update(todos)
	},

	todos: {
		value: data,
		tag:"ul",
		done:{
			type:"checkbox",
			change:(todo)=>{
				description.element.style.textDecoration = todo.done.value?"line-through":"none"
			},
		},
		remove: (todo)=>{
			todos.value.remove(todo)
			update(todos)
		}
	},

}
```

#### Explanation

NTE scan nodes with children and try load relative .js, then search for JSON and apply automatic properties generation,
node replacementa and link events. Each function is binded to todoApp. Finally execute update() for all elements.

**Automac properties generation:**
	text.tag = "input"  (because content end with ?)
	add.tag = "button" (because typeof todoApp.add = function)
	done.tag = "input"  (because type = "checkbox")
	description.tag = "span" (bacause content = "")
	remove.tag = "button" (because typeof todos.remove = function)

**Automaic link:**
	add.onClick -> todoApp.add
	done.onChange -> todos.done.change
	remove.onClick -> todos.remove

**N.B.:** [].remove = function(val) {this.splice(this.indexOf(val),1)}
	  *.element = document.querySelector(...)

