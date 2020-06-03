export const initializeCustomAnnotationClass = (Annotations) => {
  class MyCustomAnnotation extends Annotations.MarkupAnnotation {

  }
  return MyCustomAnnotation;
};