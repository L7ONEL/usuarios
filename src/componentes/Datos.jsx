import { Component } from 'react'

export default class Public extends Component {
  constructor(props) {
    super(props);
  }

    render() {
      return(
        <div className='Lista'>
          <div className='Cuadro'>
            {this.props.children}
          </div>
        </div>
      )
    }

}