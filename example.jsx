// Copyright (c) 2016 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
import * as React from 'react';
import {XYPlot, LineSeries, MarkSeries} from 'react-vis';
import * as ReactDOM from 'react-dom';  
const app=document.createElement('div'); 
app.id='application';      
document.body.appendChild(app); 
const k = 20000;



class Example extends React.Component {

  constructor() {
    super();
    this.state = {
      nearestXY: {x:0, y:0},
      data:Array(k).fill(0).map((n, idx) => ({x: idx, y: idx % 2 ? Math.random()*200 : - Math.random()*200}))
    };
  }

  render() {
   
    return (
      <XYPlot
        width={700}
        height={300}
        domainX={[0,10000]}
        domainY={[-200,200]}
      >
        {<LineSeries
          onNearestXY={(nearestXY, {event}) => this.setState({nearestXY})}
          data={this.state.data}
        />}
        {<MarkSeries
          size={5}
          fill={'yellow'}
          stroke={'red'}
          style={{pointerEvents: 'none'}}
          data={[this.state.nearestXY]}
        />}
      </XYPlot>
    );
  }
}


ReactDOM.render(
    <Example />,
    document.getElementById('application') 
);  