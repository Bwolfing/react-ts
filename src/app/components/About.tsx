import * as React from "react";

export class About extends React.Component {
    render() {
        return (
            <div>
                <p>
                    This is a simple progressive web app that I built for trying to learn about
                    the emerging web technologies. I first focused on learning React because I
                    have heard a great deal of chatter about the framework. After getting a basic
                    understanding of React, I moved on to learning about Redux, since I have
                    generally heard React and Redux referred to at the same time.
                </p>
                <p>
                    I built all of this using TypeScript because I personally prefer it to writing
                    JavaScript. The main reason I have this preference is because the compile-time
                    checks to assist in ensuring type safety. The second reason I enjoy using TypeScript
                    is because it can be transpiled to a variety of different JavaScript standards
                    while maintaining only 1 set of code.
                </p>
            </div>
        );
    }
}