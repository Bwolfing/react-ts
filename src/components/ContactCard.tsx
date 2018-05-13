import * as React from "react";

export class ContactCard extends React.Component<{contact: Contact}> {
    render() {
        return (
            <div className="card">
                <img className="card-img-top" src={"/images/" + this.props.contact.photo} />
                <div className="card-body">
                    <h5 className="card-title">
                        {this.props.contact.name}
                    </h5>
                    <h6 className="card-subtitle text-muted">
                        {this.props.contact.title}
                    </h6>
                </div>
            </div>
        );
    }
}