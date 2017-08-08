import React from 'react'
import { shallow, mount } from 'enzyme'

import d3Conduit from '../dist/d3Conduit'

describe('d3Conduit', () => {
  it('fails to produce a component without any functions', () => {
    expect(() => {
      d3Conduit()
    }).toThrow()
  })

  it('fails to produce a component without an init function', () => {
    expect(() => {
      d3Conduit(null, () => null)
    }).toThrow()
  })

  it('fails to produce a component without a render function', () => {
    expect(() => {
      d3Conduit(() => null, null)
    }).toThrow()
  })

  it('creates a component when provided two functions as well as a config object', () => {
    const Component = d3Conduit(() => null, () => null, {})
    const props = {
      data: {}
    }
    let wrapper = shallow(<Component {...props} />)
    expect(wrapper.find('div').length).toBe(1)
  })
})

describe('<d3Conduit />', () => {
  it('calls mockInitFunc with a valid plain dom node', () => {
    const mockInitFunc = jest.fn()
    const mockRenderFunc = jest.fn()
    let Component = d3Conduit(mockInitFunc, mockRenderFunc, {})
    let props = {
      data: {}
    }
    let wrapper = mount(<Component {...props} />)
    expect(mockInitFunc.mock.calls[0][0] instanceof HTMLElement).toBe(true)
  })

  it('calls mockRenderFunc with a valid plain dom node', () => {
    const mockInitFunc = jest.fn()
    const mockRenderFunc = jest.fn()
    let Component = d3Conduit(mockInitFunc, mockRenderFunc, {})
    let props = {
      data: {}
    }
    let wrapper = mount(<Component {...props} />)
    expect(mockRenderFunc.mock.calls[0][0] instanceof HTMLElement).toBe(true)
  })

  it('calls mockInitFunc with the data object from props', () => {
    const mockInitFunc = jest.fn()
    const mockRenderFunc = jest.fn()
    let Component = d3Conduit(mockInitFunc, mockRenderFunc, {})
    let props = {
      data: {
        bananas: 1
      }
    }
    let wrapper = mount(<Component {...props} />)
    expect(mockInitFunc.mock.calls[0][1]).toEqual(props.data)
  })

  it('calls mockRenderFunc with the data object from props', () => {
    const mockInitFunc = jest.fn()
    const mockRenderFunc = jest.fn()
    let Component = d3Conduit(mockInitFunc, mockRenderFunc, {})
    let props = {
      data: {
        bananas: 1
      }
    }
    let wrapper = mount(<Component {...props} />)
    expect(mockRenderFunc.mock.calls[0][1]).toEqual(props.data)
  })

  it('calls mockInitFunc with the options object passed in via the factory', () => {
    const mockInitFunc = jest.fn()
    const mockRenderFunc = jest.fn()
    let Component = d3Conduit(mockInitFunc, mockRenderFunc, { width: 300 })
    let props = {
      data: {
        bananas: 1
      }
    }
    let wrapper = mount(<Component {...props} />)
    expect(mockInitFunc.mock.calls[0][2].width).toEqual(300)
  })

  it('calls mockRenderFunc with the options object passed in via the factory', () => {
    const mockInitFunc = jest.fn()
    const mockRenderFunc = jest.fn()
    let Component = d3Conduit(mockInitFunc, mockRenderFunc, { width: 300 })
    let props = {
      data: {
        bananas: 1
      }
    }
    let wrapper = mount(<Component {...props} />)
    expect(mockRenderFunc.mock.calls[0][2].width).toEqual(300)
  })

  it('renders a single div with the class d3-container', () => {
    const mockInitFunc = jest.fn()
    const mockRenderFunc = jest.fn()
    let Component = d3Conduit(mockInitFunc, mockRenderFunc, { width: 300 })
    let props = {
      data: {
        bananas: 1
      }
    }
    let wrapper = mount(<Component {...props} />)
    expect(wrapper.find('div').hasClass('d3-container')).toEqual(true)
    expect(wrapper.find('div').length).toEqual(1)
  })

  it('renders a single svg element with a unique id', () => {
    const mockInitFunc = jest.fn()
    const mockRenderFunc = jest.fn()
    let Component = d3Conduit(mockInitFunc, mockRenderFunc, { width: 300 })
    let props = {
      data: {
        bananas: 1
      }
    }
    let wrapper = mount(<Component {...props} />)
    expect(wrapper.find(`#${wrapper.instance().id}`).length).toEqual(1)
  })

  it('renders a single svg element with a provided className', () => {
    const mockInitFunc = jest.fn()
    const mockRenderFunc = jest.fn()
    let Component = d3Conduit(mockInitFunc, mockRenderFunc, { width: 300 })
    let props = {
      data: {
        bananas: 1
      },
      className: 'banana'
    }
    let wrapper = mount(<Component {...props} />)
    expect(wrapper.find(`.${props.className}`).length).toEqual(1)
  })

  it('should call the initFunc exactly once', () => {
    const mockInitFunc = jest.fn()
    const mockRenderFunc = jest.fn()
    let Component = d3Conduit(mockInitFunc, mockRenderFunc, { width: 300 })
    let props = {
      data: {
        bananas: 1
      },
      className: 'banana'
    }
    let wrapper = mount(<Component {...props} />)
    // pass new props
    wrapper.setProps({
      data: {
        bananas: 3
      },
      className: 'banana'
    })
    expect(mockInitFunc.mock.calls.length).toEqual(1)
  })

  it('should call the renderFunc every time new props are passed', () => {
    const mockInitFunc = jest.fn()
    const mockRenderFunc = jest.fn()
    let Component = d3Conduit(mockInitFunc, mockRenderFunc, { width: 300 })
    let props = {
      data: {
        bananas: 1
      },
      className: 'banana'
    }
    let wrapper = mount(<Component {...props} />)
    // pass new props
    wrapper.setProps({
      data: {
        bananas: 3
      },
      className: 'banana'
    })
    expect(mockRenderFunc.mock.calls.length).toEqual(2)
  })
})
