# React Multilingual Content
A light package that provides a component to translate a website's content present in english/native language into other languages.

## Installation
```js
  npm i react-multilingual-content
```

## How to use?
  ### Import
  This component needs to be on the `client side` if you're using Next.js
  ```js
    import GoogleTranslator from "react-multilingual-content";
  ```
  ### Use the component
  ```js
    <GoogleTranslator className="max-w-[150px]" />
  ```
## How to style?
  ### className
  You can style the unstyled GoogleTranslator Component, just like any other element in your application, by passing in className={`classnames here`}
  Example:
  ```js
    <GoogleTranslator className="max-w-[150px]" />
  ```
  Note: By default the GoogleTranslator takes all the available width.
  The styles specified by the classes passed with the `prop className` are applied to the wrapper div.

  ### selectClassName
  You can style the select present inside the wrapper div by passing in classNames to the `selectClassName prop`
  Example:
  ```js
   <GoogleTranslator
        className="max-w-[200px]"
        selectClassName="custom-select"
    />
  ```
  #### In your css file
  ```css
    .custom-select {
      background: gray;
      color: black;
    }
  ```

### Others
You can always add wrapper divs or pass this component as props to other functions, make sure to keep in mind the Component has a wrapper div, so to prevent hydration issues, `don't use` this component inside <p></p> or <span></span> and rest other hydration prevention rules apply.

## Screenshots
![image](https://github.com/hi-Kartik2004/react-multilingual-content-pkg/assets/111000515/f5371626-48f1-4ceb-90a2-a6136e66e013)

![image](https://github.com/hi-Kartik2004/react-multilingual-content-pkg/assets/111000515/c6c2d49a-d9a9-44f6-806f-2b8e756a4d2f)


### Coming Up in Next version
You can pass in array of langauges you wanna show as options in the select element, for users to shift the content on the page to.



  



  
