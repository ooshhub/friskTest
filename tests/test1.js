const selector = `#myid.class.class2`;
const s2 = 'sdgsdg'

const splitSelector = (selector) => {
  if (typeof(selector) !== 'string') return;
  const id = selector.match(/#([\w]+)/);
  const classes = selector.matchAll(/\.([\w]+)/g) ?? [];
  return {
    id: id?.[1] ?? null,
    classes: Array.from(classes)?.map(v => v[1]),
  }
}

console.log(splitSelector(s2));

/* 	position: absolute;
	top:0%;
	left:0%;
	z-index: 1000;
	background-image: linear-gradient(to bottom,
		var(--progress-bar-highlight),
		var(--progress-bar) 40% 60%,
		var(--progress-bar-highlight)); 
	height: 0.5vh;
	transition: width 0.5s, opacity 0.3s 0.2s;
	width: 0vw;
	color: #cc24cc; */