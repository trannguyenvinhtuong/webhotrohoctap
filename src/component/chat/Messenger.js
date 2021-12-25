import { Component } from "react";
import MessengerCustomerChat from 'react-messenger-customer-chat';

class Messenger extends Component {
    render() {
        return (
            <div>
                <MessengerCustomerChat
                    pageId="102295188996392"
                    appId=" 408216890977250"
                />
            </div>
        );
    }
}

export default Messenger;