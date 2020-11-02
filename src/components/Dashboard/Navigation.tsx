import React, {ChangeEvent} from "react";
import {Component} from "react";
import {
    Navbar,
    Nav,
    NavDropdown,
    Form,
    FormControl,
    Button,
    Container,
    Modal,
    Popover,
    OverlayTrigger, ListGroup, Table, Overlay
} from 'react-bootstrap'
import {CONFIG, LEMONMARKETS} from "../../config";
import axios from 'axios';
import {debounce} from 'ts-debounce';

interface StateProps {
    showSearch: boolean;
    search: string;
    searchResults: SearchItem[];
}

interface SearchItem {
    isin: string
    type: string
    title: string
    symbol: string
}

export class Navigation extends Component<{}, StateProps> {

    state = {
        search: "",
        showSearch: false,
        searchResults: []
    }

    searchItem = async () => {
        console.log("Search Item")
        const apikey = localStorage.getItem(CONFIG.localAPIKey)
        const response = await axios.get(LEMONMARKETS.searchUrl, {
            params: {
                "search": this.state.search
            },
            headers: {
                "Authorization": "Token " + apikey,
            }
        })
        this.setState((prevState) => ({
            ...prevState,
            searchResults: response.data.results
        }));
        console.log(response.data.results)
    }

    debouncedSearch = debounce(this.searchItem, 1000);

    async searchInstrument(event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const search = event.target.value.trim()
        if (search) {
            this.setState((prevState) => ({
                ...prevState,
                search: search,
                showSearch: true
            }));
            this.debouncedSearch();
        } else {
            this.setState((prevState) => ({
                ...prevState,
                search: search,
                showSearch: false
            }));
        }
    }

    render() {
        const popover = (
            <Popover id="popover-search" show={this.state.showSearch}>
                <Popover.Content>
                    <Table>
                        <tbody>
                        {this.state.searchResults.map((listItem) => {
                            const searchItem = listItem as SearchItem;
                            return <tr>
                                <td>{searchItem.symbol}</td>
                                <td>{searchItem.title}</td>
                                <td>{searchItem.isin}</td>
                                <td>{searchItem.type}</td>
                            </tr>
                        })}
                        </tbody>
                    </Table>
                </Popover.Content>
            </Popover>)

        return (
            <Navbar variant="dark" expand="lg">
                <Navbar.Brand href="#home">Brand</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <div className="col-3">
                        <Nav>
                            <Nav.Link href="#dashboard">Dashboard</Nav.Link>
                            <Nav.Link href="#desktops">Desktops</Nav.Link>
                            <Nav.Link href="#charts">Charts</Nav.Link>
                        </Nav>
                    </div>
                    <div className="col-6">

                            <Form inline>
                                <FormControl
                                    id="searchbar"
                                    className="mr-5 ml-5 flex-fill"
                                    type="text" placeholder="Search"
                                    value={this.state.search}
                                    onChange={async (e) => {
                                        await this.searchInstrument(e)
                                    }}/>
                            </Form>
                    </div>
                    <div className="col-3"/>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}