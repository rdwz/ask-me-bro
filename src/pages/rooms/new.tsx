import React, { ReactElement, FormEvent, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useAuth } from '@/context/auth'

import SEO from '@/components/SEO'
import Button from '@/components/Button'
import { Container } from '@/styles/pages/rooms/New'
import { database } from '@/services/firebase'

export default function Auth(): ReactElement {
  const router = useRouter()
  const { user } = useAuth()
  const [newRoom, setNewRoom] = useState('')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (newRoom.trim() === '') return

    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    })

    router.push(`/admin/rooms/${firebaseRoom.key}`)
  }

  return (
    <Container>
      <SEO title="Auth" />
      <aside>
        <img
          src="/images/illustration.svg"
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src="/images/icons/logo.svg" alt="Askmebro" />

          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nome da sala"
              value={newRoom}
              onChange={e => setNewRoom(e.target.value)}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente?
            <Link href="#">
              <a>Clique aqui</a>
            </Link>
          </p>
        </div>
      </main>
    </Container>
  )
}
