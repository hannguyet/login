import React from 'react';
import { Table, Divider, Input, Button, Popconfirm, Form } from 'antd';
import { connect } from 'react-redux';
import DashboardWrapper from './styles';
import UserActions from '../../redux/users/actions';
import { getUserListSelector } from '../../redux/users/selector';


const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell  extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.getUserList(this.props.currentPage);
  }

  onChangePagination = e => {
    this.props.updateUserPage(e.current);
    this.props.getUserList(e.current, e.pageSize);
  };

  
  render() {
    const columns = [
      {
        title: 'Fullname',
        dataIndex: 'fullName',
        key: 'fullName',
      },
      {
        title: 'Trust worthy',
        dataIndex: 'trustWorthyPercent',
        key: 'trustWorthyPercent'
      },
      {
        title: 'Phone number',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber'
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="javascript:;">Edit {record.name}</a>
            <Divider type="vertical" />
            <a href="javascript:;">Delete</a>
          </span>
        ),
      }
    ];

    return (
      <DashboardWrapper>
        <Table
          rowKey={record => record.id}
          dataSource={this.props.data}
          columns={columns}
          onChange={this.onChangePagination}
          pagination={{
            total: this.props.total,
            current: this.props.currentPage,
            showSizeChanger: true
          }}
        />
      </DashboardWrapper>
    );
  }
}

const mapStateToProps = (state, props) => ({
  data: getUserListSelector(state, props),
  total: state.user.userTotal,
  currentPage: state.user.userPage
});

const mapDispatchToProps = dispatch => ({
  getUserList: (page, pageSize) =>
    dispatch(UserActions.getUserList(page, pageSize)),
  updateUserPage: page => dispatch(UserActions.updateUserPage(page))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
