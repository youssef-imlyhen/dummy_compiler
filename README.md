## dummy_compiler
 A super tiny compiler that helped me to get an idea on many of the major pieces of a modern compiler Parsing, Transformation, and Code Generation works.
It compiles some lisp-like function calls into some C-like function calls. If we had two functions `add` and `subtract` like this:
 LISP: 
 
```lisp
 (add 2 2)
(subtract 4 2)
(add 2 (subtract 4 2))
```

the compiler will turn it into C code like this:
```c
add(2, 2) 
subtract(4, 2)
add(2, subtract(4, 2))
```
You can create your own by checking this amazing [repo](https://github.com/jamiebuilds/the-super-tiny-compiler).



