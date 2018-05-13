import * as React from "react";

import { ContactCard } from "@app/components/ContactCard";

export class ContactUs extends React.Component {
    private readonly _contacts: Contact[] = [
        {
            name: "Bill Wolfington",
            title: "President and Senior Trip Advisor",
            photo: "bill.jpg"
        },
        {
            name: "Laura Wolfington",
            title: "Accounting and Trip Director",
            photo: "laura.jpg"
        }
    ];

    render() {
        const contactCards = this._contacts.map(c =>
            <div key={c.name} className="col-2">
                <ContactCard contact={c} />
            </div>
        );

        return (
            <div className="row">
                <div className="col-12">
                    <h5>
                        Contact Information
                    </h5>
                    <div className="row justify-content-md-center">
                        {contactCards}
                    </div>
                </div>
                <div className="col-12">
                    <h5>
                        Contact Form
                    </h5>
                    <form>
                        I am a form
                    </form>
                </div>
            </div>
        )
    }
}