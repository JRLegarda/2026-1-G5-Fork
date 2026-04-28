package co.icesi.auth.dtos.courses;

import co.icesi.auth.dtos.users.UserTeacherDTO;
import co.icesi.auth.model.Course;
import lombok.Data;

@Data
public class CourseItemDTO {

    private String name;

    private String description;

    private String code;

    private Integer credits;

    private String teacherName;

    public static CourseItemDTO fromCourse(Course course){
        CourseItemDTO dto = new CourseItemDTO();

        dto.setCode(course.getCode());
        dto.setCredits(course.getCredits());
        dto.setDescription(course.getDescription());
        dto.setName(course.getName());
        dto.setTeacherName(course.getTeacher().getFirstName());

        return dto;
    }
}
