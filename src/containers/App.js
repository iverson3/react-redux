/**
 * Created by stefan.wang on 8/8/2016.
 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addTodo, toggleTodo, setVisibilityFilter, VisibilityFilters } from '../actions/actions'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'
import Footer from '../components/Footer'

class App extends Component {
    render() {
        // Injected by connect() call:
        const { dispatch, visibleTodos, visibilityFilter } = this.props;
        return (
            <div>
                <AddTodo
                    onAddClick={text =>
                    dispatch(addTodo(text))
                } />
                <TodoList
                    todos={visibleTodos}
                    onTodoClick={(index, text) =>
                    dispatch(toggleTodo(index, text))
                } />
                <Footer
                    filter={visibilityFilter}
                    onFilterChange={nextFilter =>
                    dispatch(setVisibilityFilter(nextFilter))
                } />
            </div>
        )
    }
}

App.propTypes = {
    visibleTodos: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired).isRequired,
    visibilityFilter: PropTypes.oneOf([
        'SHOW_ALL',
        'SHOW_COMPLETED',
        'SHOW_ACTIVE'
    ]).isRequired
};

function selectTodos(todos, filter) {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(todo => todo.completed)
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(todo => !todo.completed)
    }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
    return {
        visibleTodos: selectTodos(state.todos, state.visibilityFilter),
        visibilityFilter: state.visibilityFilter
    }
}

// 在react应用中，store的数据只有container component能知晓，container component会将知晓的数据传递给dummy components
// 除此之外 action 的触发方法也会由它传递给 dummy components
// react-redux提供了一个叫connect 的方法，可以将一个组件变为container component
// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中
export default connect(select)(App)