# Simplexture 🌀

Simplexture is a vanilla JavaScript library that uses [simplex noise](https://en.wikipedia.org/wiki/Simplex_noise) and Canvas to create unique algorithmic textures.

## Usage
Simplexture can be imported as a module:

```
import { Dot, Dash } from 'simplexture';
```

Or it can be used on an HTML page as a script.

```
<script src="http://unpkg.com/simplexture"></script>
<script type="text/javascript">
  const { Dot, Dash } = Simplexture;
  ...
</script>
```

## How to use

Simplexture isn't too complicated! It has a few functions that spin up specific types of patterns.

* Simplexture.**Dot()**
* Simplexture.**Dash()**
* Simplexture.**Wave()**
* More to come!

To get it rolling, you'll just need a `Canvas` element.

```
<script src="http://unpkg.com/simplexture"></script>

<body>
  <canvas style="width: 500px; height: 500px;" />
</body>

<script type="text/javascript">
  const { Dot } = Simplexture;
  const canvas = document.querySelector('canvas');
  const texture = Dot({
      target: canvas
  })
</script>
```

This will fill the canvas object with a texture, using default values.

How can you customize this? A few ways:

* **You might specify a `seed` value,** so the texture stays the same every time you load the page. (By default, Simplexture uses the current Unix timestamp to seed its randomness.)

* **You can mess with the spacing and size of the elements.** For `Dot`, changing `minRadius,` `maxRadius` and `padding` will greatly affect the visual density. For `Wave`, setting a low `padding` can make wacky moire effects.

* **You can alter the `noise` values.** Generally, setting `noise.x` and `noise.y` to lower values (like .001) will result in more uniform patterns. Setting them higher (.1) makes the display much more random.

* You can add a **custom noise value** keyed to something else on the page. Simplexture textures vary their patterns based on x- and y-coordinates of the interior elements. By adding a custom value, you can make the texture respond to something else — the passage of time, how far down the user has scrolled on the page, etc.

Let's try adding all of these together!

```
<script src="http://unpkg.com/simplexture"></script>

<body>
  <canvas style="width: 500px; height: 500px;" />
</body>

<script type="text/javascript">
  const { Dot } = Simplexture;
  const canvas = document.querySelector('canvas');
  const texture = Dot({
      target: canvas,
      minRadius: 4,
      maxRadius: 6,
      padding: 2,
      style: {
        fill: red,
      },
      noise: {
        x: .01,
        y: .01,
        custom: .0001
      },
      customValue: new Date().getTime(),
      resize: true,
  });

  setInterval(() => {
    texture.repaint({
      customValue: new Date().getTime(),
    })
  }, 100);
</script>
```

## Background
How does Simplexture and simplex noise work?

The bottom line is that all of these textures feature regular patterns that vary in **one way.**

* In `Dots`, evenly spaced dots vary by size.
* In `Dash`, evenly spaced lines vary by angle.
* In `Wave`, evenly spaced horizontal curves vary by curviness.

Now, if we just used `Math.random()` to do this, these textures wouldn't look like textures at all — they'd look like static.

But that's the beauty of **simplex noise.** It's a fancy type of randomness function that accepts a number of values, and then plots out an infinite series of random numbers — where each random number is related to the number before it.

It's randomness, but with memory of what's preceded it. So the resulting number patterns look a lot more purposeful and organic.  

## API reference

### Common
All Simplexture intializing functions have a few shared parameters.

* `target` (HTMLElement) (**required**): The `<canvas>` element hosting the texture.
* `seed` (String): A string to seed the simplex randomness function. Defaults to the current Unix timestamp.
* `resize` (boolean): Set to `true` if you want the texture to redraw itself when its `<canvas>` changes dimensions. (Otherwise, the texture will distort if the container changes size.)
* `customValue` (number): A variable you can use to further influence the pattern's randomness. You can set this to be anything — the current time, the scroll position on the page, the S&P 500 closing price, etc.
* `noise` (Object): An object with three keys, `x`, `y`, and `custom`, all of which expect numbers. The numbers determine how quickly your texture traverses simplex space, which sounds cool and sci-fi. Practically speaking, setting higher numbers here will make your patterns more random, while setting lower numbers makes them more stable.

After initializing, all pattern functions return a `Texture` object with the same methods.

* `remove()`: Eliminate a texture and all associated math.
* `repaint({ customValue: integer })`: Redraws a 'Texture' based on a new `customValue`.
* `update()`: Reinitializes a `Texture` (use this if the element's size has changed and you want to redraw).

Without further ado, here are the pattern functions.

### Dot({ options })

Creates an evocative dot-matrix-y texture.

Returns a `Texture` object.

#### Options
* `padding` (number): How far apart the dots are placed vertically and horizontally, in pixels.
* `minRadius` (number): The minimum size of the patterned circles, in pixels.
* `maxRadius` (number): The max size of the patterned circles, in pixels.
* `style` (object): Styling data for the circles.
  * `fill` (string): An name or hex code for the color of the circles.

### Dash({ options })
Creates an evocative wind-blowing-y texture.

Returns a `Texture` object.

#### Options
* `padding` (number): How far apart the dashes are placed vertically and horizontally, in pixels.
* `lineLength` (number): The length of the dashes, in pixels.
* `style` (object): Styling data for the circles.
  * `strokeStyle` (string): An name or hex code for the color of the dashes.
  * `lineWidth` (number): The stroke width of the dashes, in pixels — how fat or thin they are.
  * `lineCap` (string): The style of the endcaps of the dashes. Either `round`, `butt` or `square`.

### Wave({ options })
![Wave texture](https://i.imgur.com/Qcj7lYw.png)

Creates an evocative water-flowing-y texture.

Returns a `Texture` object.

#### Options
* `padding` (number): Distance separating each line vertically, in pixels.
* `segmentWidth` (number): The length of each segment of the full line, in pixels.
* `minHeightVariation` (number): How high vertically a line can veer due to randomness.
* `maxHeightVariation` (number): How low vertically a line can veer due to randomness.
* `style` (object): Styling data for the circles.
  * `strokeStyle` (string): An name or hex code for the color of the dashes.
  * `lineWidth` (number): The stroke width of the dashes, in pixels — how fat or thin they are.
  * `lineCap` (string): The style of the endcaps of the dashes. Either `round`, `butt` or `square`.
