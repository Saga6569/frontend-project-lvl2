# Учебный проект "Вычислитель отличий" в рамках курса по фронтенду от hexlet.io

<a href="https://codeclimate.com/github/Saga6569/frontend-project-lvl2/maintainability"><img src="https://api.codeclimate.com/v1/badges/5788df5816dc48214905/maintainability" /></a>


<a href="https://codeclimate.com/github/Saga6569/frontend-project-lvl2/test_coverage"><img src="https://api.codeclimate.com/v1/badges/5788df5816dc48214905/test_coverage" /></a>


[![Node CI](https://github.com/Saga6569/frontend-project-lvl2/workflows/Node%20CI/badge.svg)](https://github.com/Saga6569/frontend-project-lvl2/actions)


##  Ментор [Ivan Gagarinov](https://ru.hexlet.io/u/dzencot)

## Минимальные  требования

Node.js 14. и выше.

## Установка

1. `$ git clone https://github.com/Saga6569/frontend-project-lvl2.git`

3. `$ cd fronted-project-lvl2`

4. `$ npm install`

5. `$ npm link`

6.  Готово!

### Данная утилита позволяет сравнить 2 файла c расширением 'json', 'yml', 'ini' как одного, так и разных форматов и принимает относительный или абсолютный путь 

### Чтобы получить информацию об утилите используйте команду gendiff -h

[![asciicast](https://asciinema.org/a/1wkCvpACKrr1UCVdlywpGRZz4.svg)](https://asciinema.org/a/1wkCvpACKrr1UCVdlywpGRZz4)

### Утилита имеет 3 формата вывода - 'stylish', 'plain', 'json'

### Формат 'stylish' используется по умолчанию

Чтобы сравнить два файла используйте команду gendiff fileName1 fileName2, если вы в одной диретории с файлами.

[![asciicast](https://asciinema.org/a/tl1YKjewMyKZ1dMIXSnyoMJvO.svg)](https://asciinema.org/a/tl1YKjewMyKZ1dMIXSnyoMJvO)

если в другой деректории 

 [![asciicast](https://asciinema.org/a/sNbI9IDSfSiBoqPbv9VUmi8Vk.svg)](https://asciinema.org/a/sNbI9IDSfSiBoqPbv9VUmi8Vk)

### Формат 'plain' и 'json' нужно  указать

пример формата 'plain' gendiff --format plain fileName1 fileName2  

[![asciicast](https://asciinema.org/a/EIs7HJ8AKiuD3QO6LRCcEbAcw.svg)](https://asciinema.org/a/EIs7HJ8AKiuD3QO6LRCcEbAcw)

пример формата 'json' gendiff --format json fileName1 fileName2  

[![asciicast](https://asciinema.org/a/MylN3AZJQjvUHexFP5h3h6X83.svg)](https://asciinema.org/a/MylN3AZJQjvUHexFP5h3h6X83)

### Так же можно сравнивать файлы разных форматов

[![asciicast](https://asciinema.org/a/X1WBl6SfaevuMNaGnyPt4VZYt.svg)](https://asciinema.org/a/X1WBl6SfaevuMNaGnyPt4VZYt)

