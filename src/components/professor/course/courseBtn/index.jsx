import React from 'react';
import classes from "./index.module.css";



class SelectCourseBtn extends React.Component {

    onChange = (e)=> {
        this.props.changeCourse(e.target.value);
    };

    render() {
        if (!!this.props.courses) {
            this.courseList = Object.keys(this.props.courses).map(courseName => {
                return  <option value={courseName} key={courseName}> {courseName} </option>
            });
        }
        return (
            <div className={classes.btnSelectContent}>
                <select onChange={this.onChange} className={classes.btnSelectCourses}>
                    {this.courseList}
                    {/*<option defaultValue="test" >test</option>*/}
                    {/*<option value="test" >tes1t</option>*/}
                </select>
            </div>
        );
    }
}




export default SelectCourseBtn;