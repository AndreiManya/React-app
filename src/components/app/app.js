import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list/';
import PostAddForm from '../post-add-form/';

import './app.css';


export default class App extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      data : [
        {label: 'First app w/ react', important: true, id:1, like: false},
        {label: 'Practice - important part of education', important: false, id:2, like: false}
      ],
      term: '',
      filter: 'all'
    }
    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.maxId = 4;
    this.onLike = this.onLike.bind(this);
    this.onImportant = this.onImportant.bind(this);
    this.onUpdateSearch = this.onUpdateSearch.bind(this);
    this.onFilterSelect = this.onFilterSelect.bind(this);
  }

  deleteItem(id){
    this.setState(({data})=>{
      const index = data.findIndex(elem => elem.id === id);
      const newArray = [ ...data.slice( 0, index), ...data.slice(index+1) ];
      return {
        data: newArray
      }
    });
  }

  addItem(body){
    const newItem = {
      label: body,
      important: false, 
      id: this.maxId++
    }
    this.setState(({data}) => {
      const newArr = [...data, newItem];

      return {
        data: newArr
      }
    })
  } 

  
  onLike(id){
    this.setState(({data}) => {
      const index = data.findIndex(elem => elem.id === id);
      const old = data[index];
      const newItem = {...old, like : !old.like};
      const newArray = [ ...data.slice( 0, index), newItem, ...data.slice(index+1) ];

      return {
        data: newArray
      }
    })

  }

  onImportant(id){
    this.setState(({data}) => {
      const index = data.findIndex(elem => elem.id === id);
      const old = data[index];
      const newItem = {...old, important : !old.important};
      const newArray = [ ...data.slice( 0, index), newItem, ...data.slice(index+1) ];
      
      return {
        data: newArray
      }
    })
  }

  searchPosts(items, term) {
    if (term.length === 0) { 
      return items
    }

    return items.filter( (item) => { 
      return item.label.indexOf(term) > -1
    });
  }

  onUpdateSearch(term) { 
    this.setState({term})
  }

  filterPosts(items, filter) {
    if (filter === 'like') {
      return items.filter( (item) => item.like);
    } else {
      return items;
    }

  }

  onFilterSelect(filter) { 
    this.setState({filter})
  }

  render(){
    const {data, term, filter} = this.state;
    const likedPosts = data.filter(e => e.like).length;
    const allPosts = data.length;
    const visiblePosts = this.filterPosts(this.searchPosts(data, term), filter);

    return (
      <div className="app">
        <AppHeader
          likedPosts = {likedPosts} 
          allPosts = {allPosts}
        />
        <div className="search-panel d-flex">
          <SearchPanel 
            onUpdateSearch={this.onUpdateSearch}
          />
          <PostStatusFilter
            filter={filter}
            onFilterSelect={this.onFilterSelect}
          />
        </div>
        <PostList 
          posts= {visiblePosts}
          onDelete= {this.deleteItem} 
          onLike = {this.onLike} 
          onImportant = {this.onImportant}
        />
        <PostAddForm
        onAdd={this.addItem}/>
      </div>
    )
  }
  
}