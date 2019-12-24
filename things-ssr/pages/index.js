import Link from 'next/link'

export default () => (
  <ul>
    <li>
      <Link href="/about" as="/about">
        <a>About</a>
      </Link>
    </li>
    <li>
      <Link href="/about/?word=hello" as="/about/hello">
        <a>About with hello</a>
      </Link>
    </li>
  </ul>
)
