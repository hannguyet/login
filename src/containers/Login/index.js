import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { Form, Icon, Button, Input } from 'antd';
import AuthActions from '../../redux/auth/actions';

const FormItem = Form.Item;

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      email:'',
      password:''
    };
}
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        
        this.props.login(values);
      }
    });
  };

  render() {
    const { form, isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { getFieldDecorator } = form;
    return (
      <div>
        <div className="title">
          <span>{'LOGIN'}</span>
        </div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Email"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

Login.propTypes = {
  form: PropTypes.object,
  login: PropTypes.func,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state, props) => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  login: data => dispatch(AuthActions.login(data))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Form.create()(Login))
);
