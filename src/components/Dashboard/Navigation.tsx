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
    OverlayTrigger, ListGroup, Table, Overlay, Tabs, Tab
} from 'react-bootstrap'
import {CONFIG, LEMONMARKETS} from "../../config";
import axios from 'axios';
import {debounce} from 'ts-debounce';
import Autosuggest from 'react-autosuggest';
import '../../css/navigation.css';
import {Trans} from "@lingui/macro";


interface StateProps {
    showSearch: boolean;
    search: string;
    searchResults: SearchItem[];
    searchType: string
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
        searchResults: [],
        searchType: "stocks"
    }

    onSearchTypeChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        this.setState((prevState) => ({
            ...prevState,
            searchType: event.target.value
        }));
    }

    // Teach Autosuggest how to calculate suggestions for any given input value.
    getSuggestions = async (value: string) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        if (inputLength === 0) {
            return []
        } else {
            const apikey = localStorage.getItem(CONFIG.localAPIKey)
            console.log(this.state.searchType)
            const response = await axios.get(LEMONMARKETS.searchUrl, {
                params: {
                    "search": this.state.search,
                    "type": this.state.searchType
                },
                headers: {
                    "Authorization": "Token " + apikey
                }
            })
            console.log(response.request.url)
            console.log(response.data)
            return response.data;
        }
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = async (value: string) => {
        const suggestions = await this.getSuggestions(value)
        this.setState((prevState) => ({
            ...prevState,
            searchResults: suggestions
        }));
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState((prevState) => ({
            ...prevState,
            searchResults: []
        }));
    };

    getSuggestionValue = (suggestion: SearchItem) => suggestion.title;

    // @ts-ignore
    renderSuggestionsContainer({containerProps, children}) {
        return (
            <ListGroup {...containerProps}>
                {children}
            </ListGroup>
        );
    }

    // Use your imagination to render suggestions.
    renderSuggestion = (suggestion: SearchItem) => (
        <ListGroup.Item className="">
            {suggestion.title}
        </ListGroup.Item>
    );

    render() {
        return (
            <Navbar variant="dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <div className="col-4">
                        <Nav>
                            <Navbar.Brand href="#home">Brand</Navbar.Brand>
                            <Nav.Link href="#dashboard">Dashboard</Nav.Link>
                            <Nav.Link href="#desktops">Desktops</Nav.Link>
                            <Nav.Link href="#charts">Charts</Nav.Link>
                        </Nav>
                    </div>
                    <div className="col-4">
                        <Autosuggest
                            suggestions={this.state.searchResults}
                            onSuggestionsFetchRequested={async (e) => await this.onSuggestionsFetchRequested(e.value)}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={this.getSuggestionValue}
                            renderSuggestion={this.renderSuggestion}
                            renderSuggestionsContainer={this.renderSuggestionsContainer}
                            inputProps={{
                                placeholder: 'WKN, ISIN or Name',
                                value: this.state.search,
                                onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
                                    const search = e.target.value.trim()
                                    this.setState((prevState) => ({
                                        ...prevState,
                                        search: search,
                                        showSearch: true
                                    }));
                                }
                            }}
                            theme={
                                {
                                    container: 'react-autosuggest__container',
                                    containerOpen: 'react-autosuggest__container--open',
                                    input: 'form-control',
                                    inputOpen: 'react-autosuggest__input--open',
                                    inputFocused: 'form-control:focus',
                                    suggestionsContainer: 'react-autosuggest__suggestions-container',
                                    suggestionsContainerOpen: 'react-autosuggest__suggestions-container--open',
                                    suggestionsList: 'react-autosuggest__suggestions-list',
                                    suggestion: 'react-autosuggest__suggestion',
                                    suggestionFirst: 'list-group:first-child',
                                    suggestionHighlighted: 'react-autosuggest__suggestion--highlighted',
                                    sectionContainer: 'react-autosuggest__section-container',
                                    sectionContainerFirst: 'react-autosuggest__section-container--first',
                                    sectionTitle: 'react-autosuggest__section-title'
                                }
                            }
                        >
                        </Autosuggest>
                    </div>
                    <div className="col-4">
                        <Form inline>
                            <FormControl as="select" custom onChange={this.onSearchTypeChange}>
                                <option value="stocks">
                                    Stocks
                                </option>
                                <option value="bonds">
                                    Bonds
                                </option>
                                <option value="fonds">
                                    Fonds
                                </option>
                                <option value="warrants">
                                    Warrants
                                </option>
                            </FormControl>
                        </Form>
                    </div>
                </Navbar.Collapse>
            </Navbar>
        )
    }

// <Form inline>
// <FormControl
// id="searchbar"
// className="mr-5 ml-5 flex-fill"
// type="text" placeholder="Search"
// value={this.state.search}
// onChange={async (e) => {
//     await this.searchInstrument(e)
// }}/>
// </Form>

}