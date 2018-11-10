import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseAction';
import CourseForm from './CourseForm';
import { authorsFormattedForDropdown } from '../../selectors/selectors';
import toastr from 'toastr';

export class ManagerCoursePage extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      saving: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.course.id !== nextProps.course.id) {
      this.setState({ course: Object.assign({}, nextProps.course) });
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    let course = Object.assign({}, this.state.course);
    course[field] = event.target.value;
    return this.setState({ course });
  }

  courseFormIsValid() {
    let formIsValid = true;
    let errors = {};
    if (this.state.course.title.length < 5) {
      errors.title = 'Title must be at least 5 characteres.';
      formIsValid = false;
    }
    this.setState({ errors: errors });
    return formIsValid;
  }

  saveCourse(event) {
    event.preventDefault();
    if (!this.courseFormIsValid()) {
      return;
    }

    this.setState({ saving: true });
    this.props.actions.saveCourse(this.state.course)
    .then(() => this.redirect())
    .catch(error => {
      toastr.error(error);
      this.setState({ saving: false });
    });
  }

  redirect() {
    this.setState({ saving: false });
    toastr.success('Course saved!');
    this.context.router.push('/courses');
  }

  render () {
    return (
      <CourseForm
        course={ this.state.course }
        allAuthors={ this.props.authors }
        errors={ this.state.errors }
        onChange={ this.updateCourseState }
        onSave={ this.saveCourse }
        saving={ this.state.saving }
      />
    );
  }
}


ManagerCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function getCourseById(courses, id) {
  const course = courses.filter(course => course.id === id);
  if (course) {
    return course[0];
  }

  return null;
}

function mapStateToProps(state, ownProps) {
  const courseId = ownProps.params.id;
  let course = { id: '', watchHref: '', title: '', authorId: '', length: '', category: '' };
  if (course && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  return {
    course,
    authors: authorsFormattedForDropdown(state.authors)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagerCoursePage);
