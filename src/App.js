import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
const marked = require('marked');

let markContent = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`;

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			markdown: {
				copied: false,
				content: markContent
			}
		};
		this.handleChange = this.handleChange.bind(this);
		this.rawMarkup = this.rawMarkup.bind(this);
		this.clearMarkdown = this.clearMarkdown.bind(this);
	}

	rawMarkup(raw) {
		const rawMarkup = marked(raw, { sanitize: true });
		return { __html: rawMarkup };
	}

	handleChange(event) {
		const change = this.state.markdown;
		change.content = event.target.value;
		this.setState({ markdown: change });
	}

	clearMarkdown() {
		this.setState({
			markdown: { content: '' }
		});
	}

	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<div id="home" className="col-sm markdown">
						<h3 className="title1">Markdown</h3>
						<textarea onChange={this.handleChange} value={this.state.markdown.content} id="editor" />
						<button className="btn" onClick={this.clearMarkdown}>
							<i className="fa fa-trash" /> Delete
						</button>
						<CopyToClipboard
							text={this.state.markdown.content}
							onCopy={() => this.setState({ copied: true })}
						>
							<button className="btn">
								<i className="fa fa-clipboard" /> Copy to clipboard
							</button>
						</CopyToClipboard>
					</div>
					<div className="col-sm" id="content">
						<h3 className="title2">Preview</h3>
						<div id="preview" dangerouslySetInnerHTML={this.rawMarkup(this.state.markdown.content)} />
						<button className="btn">
							<a href="#home">
								<i className="fa fa-chevron-circle-up 3x" /> Back To Top
							</a>
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
