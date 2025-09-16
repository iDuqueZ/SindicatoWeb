// src/components/GaleriaFotos.tsx
import React, { useEffect, useRef, useState } from "react";
import "photoswipe/style.css"; // estilos de PhotoSwipe (se carga en cliente dentro de useEffect también por seguridad SSR)
import "../plugins/photoswipe-dynamic-caption-plugin.css";

/**
 * Tipado de cada entrada del JSON
 */
interface GalleryImage {
  src: string;
  alt: string;
  orientation: "vertical" | "horizontal" | string;
  description: string;
}

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  orientation: string;
  description: string;
}

function ImageWithSkeleton({ src, alt, orientation, description }: ImageWithSkeletonProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full mb-4 break-inside-avoid">
      {/* Skeleton con aspect-ratio */}
      <div
        className={`rounded-lg bg-gray-200 animate-pulse ${orientation === "vertical" ? "aspect-[9/16]" : "aspect-[16/9]"
          } ${loaded ? "hidden" : "block"}`}
      ></div>

      <a
        href={src}
        data-pswp-src={src}
        data-pswp-width={orientation === "vertical" ? 1080 : 1920}
        data-pswp-height={orientation === "vertical" ? 1920 : 1080}
        target="_blank"
        rel="noreferrer"
        className={`${loaded ? "block" : "absolute inset-0 opacity-0 pointer-events-none"}`}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-auto rounded-lg shadow-md hover:opacity-90 transition outline-1 outline-gray-50 outline-offset-2 hover:outline-red-500 hover:outline-offset-4"
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
        <span className="pswp-caption-content">
          <p>{alt}</p>
          <p>{description}</p>
        </span>
      </a>
    </div>
  );
}

/**
 * Configuración:
 * - BATCH_SIZE: cuántas imágenes cargar por tanda (15 según tu requerimiento)
 */
const BATCH_SIZE = 15;

export default function GaleriaFotos(): JSX.Element {
  // array completo que viene del JSON (se carga en cliente con fetch)
  const [allImages, setAllImages] = useState<GalleryImage[]>([]);
  // imágenes que actualmente se muestran en el DOM
  const [displayedImages, setDisplayedImages] = useState<GalleryImage[]>([]);
  // índice hasta donde hemos cargado (siguiente posición a cargar)
  const [currentIndex, setCurrentIndex] = useState(0);
  // indicador simple de "cargando más" (opcional para spinner)
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // refs para el contenedor y sentinel (final)
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // ref para guardar la instancia de PhotoSwipeLightbox (para refrescar / destruir)
  const lightboxRef = useRef<any>(null);
  const captionPluginRef = useRef<any>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  /**
   * Carga el JSON desde /galeria/index.json en el cliente.
   * (Esto evita SSR y hace que todo quede del lado del cliente, como pediste)
   */
  useEffect(() => {
    let mounted = true;

    async function loadJson() {
      try {
        const res = await fetch("/galeria/index.json", { cache: "no-cache" });
        if (!res.ok) throw new Error(`Error cargando JSON: ${res.status}`);
        const data: GalleryImage[] = await res.json();

        if (!mounted) return;

        setAllImages(data);
        // cargar primer batch
        const first = data.slice(0, BATCH_SIZE);
        setDisplayedImages(first);
        setCurrentIndex(first.length);
      } catch (err) {
        // Manejo mínimo de errores; puedes sustituir por tu logger
        // No hacemos alert molesto; lo dejamos en consola
        // (en producción querrás UI para indicar error)
        // eslint-disable-next-line no-console
        console.error(err);
      }
    }

    loadJson();

    return () => {
      mounted = false;
    };
  }, []);

  /**
   * Inicializa PhotoSwipe de forma dinámica (solo en cliente).
   * Hacemos import dinámico para evitar problemas con SSR y para cargar la dependencia
   * sólo si el componente se monta.
   *
   * Se inicializa una sola vez; cuando se carguen más imágenes, llamamos a
   * lightboxRef.current.refresh().
   */
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        // importa PhotoSwipeLightbox dinamicamente
        const { default: PhotoSwipeLightbox } = await import("photoswipe/lightbox");
        // importa plugin de captions dinámicos (ajusta la ruta si es necesario)
        const { default: PhotoSwipeDynamicCaption } = await import(
          /* webpackIgnore: true */ "../plugins/photoswipe-dynamic-caption-plugin.esm.js"
        );

        if (!mounted) return;

        // crear instancia de lightbox
        lightboxRef.current = new PhotoSwipeLightbox({
          gallery: ".galeria",
          children: "a",
          // pswpModule puede cargarse internamente cuando se abra el lightbox
          pswpModule: () => import("photoswipe"),
          padding: { top: 20, bottom: 40, left: 100, right: 100 },
        });

        // instanciar plugin de captions
        captionPluginRef.current = new PhotoSwipeDynamicCaption(lightboxRef.current, {
          mobileLayoutBreakpoint: 700,
          type: "auto",
          mobileCaptionOverlapRatio: 1,
        });

        lightboxRef.current.init();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Error inicializando PhotoSwipe:", err);
      }
    })();

    // cleanup al desmontar
    return () => {
      mounted = false;
      try {
        if (lightboxRef.current) {
          lightboxRef.current.destroy();
          lightboxRef.current = null;
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn("Error destruyendo PhotoSwipe:", err);
      }
    };
  }, []);

  /**
   * loadMore: añade el siguiente batch de imágenes a displayedImages.
   * Si ya se llegó al final, no hace nada.
   */
  function loadMore() {
    if (currentIndex >= allImages.length) return; // nada por hacer

    setIsLoadingMore(true);

    // tomar slice siguiente
    const next = allImages.slice(currentIndex, currentIndex + BATCH_SIZE);
    // añadimos al arreglo actual
    setDisplayedImages((prev) => [...prev, ...next]);
    setCurrentIndex((prev) => prev + next.length);

    // tras actualizar el estado React, refrescamos PhotoSwipe para que detecte los nuevos enlaces
    // usamos setTimeout 0 para esperar a que el DOM se actualice (no estrictamente necesario,
    // pero evita condiciones de carrera en algunos entornos)
    setTimeout(() => {
      try {
        lightboxRef.current?.refresh?.();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn("No se pudo refrescar PhotoSwipe:", err);
      } finally {
        setIsLoadingMore(false);
      }
    }, 0);
  }

  /**
   * IntersectionObserver: observa el sentinel para cargar más cuando llegue al viewport.
   * Se configura una sola vez y se limpia al desmontar.
   */
  useEffect(() => {
    // no inicializar hasta que tengamos sentinel y images cargadas
    if (!sentinelRef.current) return;
    if (allImages.length === 0) return;

    // ya hay un observer previo? limpiarlo
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    // callback del observer
    const onIntersect: IntersectionObserverCallback = (entries) => {
      const e = entries[0];
      if (e.isIntersecting && currentIndex < allImages.length) {
        loadMore();
      }
    };

    const obs = new IntersectionObserver(onIntersect, {
      root: null,
      rootMargin: "200px", // empezar a cargar un poco antes de llegar al final
      threshold: 0.1,
    });

    obs.observe(sentinelRef.current);
    observerRef.current = obs;

    return () => {
      obs.disconnect();
      observerRef.current = null;
    };
    // intentionally include currentIndex and allImages so que el observer re-evalúa si cambian
  }, [allImages, currentIndex]);

  /**
   * Render del componente
   */
  return (
    <section className="w-full pb-8 galeria">
      {/* contenedor en columnas (Tailwind classes, ajústalas si no usas Tailwind) */}
      <div
        ref={containerRef}
        id="gallery-container"
        className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4 [column-fill:_balance]"
      >
        {displayedImages.map((img, idx) => (
          <ImageWithSkeleton
            key={`${img.src}-${idx}`}
            src={img.src}
            alt={img.alt}
            orientation={img.orientation}
            description={img.description}
          />
        ))}

      </div>

      {/* sentinel: div vacío que el IntersectionObserver observará */}
      <div ref={sentinelRef} id="sentinel" className="h-4" />

      {/* Loading UI mínima */}
      {isLoadingMore && (
        <div className="w-full flex justify-center py-4">
          <span aria-hidden>⏳ Cargando más imágenes…</span>
        </div>
      )}
    </section>
  );
}
