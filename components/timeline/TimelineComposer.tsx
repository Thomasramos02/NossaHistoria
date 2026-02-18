"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { CalendarDays, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/components/ui/use-mobile";
import type { TimelineEvent } from "./types";

type TimelineComposerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialItem?: TimelineEvent | null;
  onSave: (item: TimelineEvent) => void;
};

const createId = () => {
  if (typeof globalThis !== "undefined" && "crypto" in globalThis) {
    const cryptoObj = globalThis.crypto as Crypto;
    if (cryptoObj?.randomUUID) return cryptoObj.randomUUID();
  }
  return `timeline-${Date.now()}`;
};

const parseList = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export function TimelineComposer({
  open,
  onOpenChange,
  initialItem,
  onSave,
}: TimelineComposerProps) {
  const isMobile = useIsMobile();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [gallery, setGallery] = useState("");
  const [isMilestone, setIsMilestone] = useState(false);

  const isEditing = Boolean(initialItem);

  useEffect(() => {
    if (!open) return;
    setTitle(initialItem?.title ?? "");
    setDate(initialItem?.date ?? "");
    setDescription(initialItem?.description ?? "");
    setLocation(initialItem?.location ?? "");
    setTags(initialItem?.tags?.join(", ") ?? "");
    setCoverUrl(initialItem?.coverUrl ?? "");
    setGallery(initialItem?.gallery?.join(", ") ?? "");
    setIsMilestone(initialItem?.isMilestone ?? false);
  }, [open, initialItem]);

  const payload = useMemo<TimelineEvent>(
    () => ({
      id: initialItem?.id ?? createId(),
      title,
      date,
      description,
      location,
      tags: parseList(tags),
      coverUrl: coverUrl || undefined,
      gallery: parseList(gallery),
      isMilestone,
      reactions: initialItem?.reactions ?? [
        { id: "love", emoji: "❤️", count: 0 },
        { id: "spark", emoji: "✨", count: 0 },
        { id: "heart", emoji: "💫", count: 0 },
      ],
      comments: initialItem?.comments ?? [],
    }),
    [
      initialItem,
      title,
      date,
      description,
      location,
      tags,
      coverUrl,
      gallery,
      isMilestone,
    ]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(payload);
    onOpenChange(false);
  };

  const content = (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Ex: Nosso primeiro encontro"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Data</Label>
          <div className="relative">
            <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              placeholder="2023-06-12"
              className="pl-9"
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Conte o que tornou esse momento especial."
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="location">Local</Label>
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="São Paulo"
              className="pl-9"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            value={tags}
            onChange={(event) => setTags(event.target.value)}
            placeholder="viagem, aniversário"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="coverUrl">Imagem principal</Label>
          <Input
            id="coverUrl"
            value={coverUrl}
            onChange={(event) => setCoverUrl(event.target.value)}
            placeholder="/images/casal-1.svg"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gallery">Galeria</Label>
          <Input
            id="gallery"
            value={gallery}
            onChange={(event) => setGallery(event.target.value)}
            placeholder="/images/casal-2.svg, /images/casal-3.svg"
          />
        </div>
      </div>

      <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-neutral-950/60 px-4 py-3 text-sm text-neutral-200">
        <Switch
          checked={isMilestone}
          onCheckedChange={setIsMilestone}
          className="data-[state=checked]:bg-red-500"
        />
        <Sparkles className="h-4 w-4 text-red-300" />
        Marcar como momento especial
      </label>

      <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
        <Button
          type="button"
          variant="ghost"
          onClick={() => onOpenChange(false)}
        >
          Cancelar
        </Button>
        <Button type="submit" className="bg-red-500 text-white hover:bg-red-600">
          {isEditing ? "Salvar alterações" : "Criar capítulo"}
        </Button>
      </div>
    </form>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="border-white/10 bg-neutral-950 text-white">
          <DrawerHeader>
            <DrawerTitle>
              {isEditing ? "Editar capítulo" : "Novo capítulo"}
            </DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-6">{content}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/10 bg-neutral-950 text-white">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar capítulo" : "Novo capítulo"}
          </DialogTitle>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
}
