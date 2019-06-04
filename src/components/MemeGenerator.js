import React, {Component} from 'react'
import './MemeGenerator.css'

class MemeGenerator extends Component {
    constructor(){
        super()
        this.state = {
            'topText': '',
            'bottomText': '',
            'allMemes': [],
            'randomMeme': "http://i.imgflip.com/1bij.jpg"
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(res => {
            const { memes } = res.data
            this.setState({ allMemes: memes })
        })
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    handleClick(event) {
        event.preventDefault()
        let memes = this.state.allMemes
        let randomize = memes[Math.floor(Math.random() * memes.length)];
        this.setState({ randomMeme: randomize.url })
    }

    render() {
        return (
            <div> 
                <form className="meme-form">
                    <input  type="text"
                            name="topText"
                            placeholder="Top Text"
                            value={this.state.topText}
                            onChange={this.handleChange}
                    />
                    <input  type="text"
                            name="bottomText"
                            placeholder="Bottom Text"
                            value={this.state.bottomText}
                            onChange={this.handleChange}
                    />
                    <button onClick={this.handleClick}>Generate Meme</button>
                </form> 
                <div className="memePosition">
                    <img src={this.state.randomMeme} />
                    <p className="topText-position">{this.state.topText}</p>
                    <p className="bottomText-position">{this.state.bottomText}</p>
                </div>
            </div>
        )
    }
}

export default MemeGenerator