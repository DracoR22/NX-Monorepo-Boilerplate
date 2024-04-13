import { Button } from '@supply-chain/react-lib'

const HomePage = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex-col flex items-center">
        <h1 className="font-semibold text-2xl">
          Welcome To NX Monorepo Boilerplate
        </h1>
        <Button />

        <div className="mt-10">
          <h2 className="mb-3 text-3xl font-semibold">Features:</h2>
          <ul className="list-disc list-inside">
            <li>Monorepo with PNPM workspaces</li>
            <li>Next.js for Frontend & SSR</li>
            <li>NestJS for Robust API Development</li>
            <li>Prisma ORM</li>
            <li>GraphQL and REST API Endpoints</li>
            <li>GraphQL Codegen for Efficient Development</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HomePage
