import { Position, ReverseGeocodeResponse } from "@/types/index";

export async function getAddress({ latitude, longitude }: Position) {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`,
  );
  if (!res.ok) throw Error("Failed getting address");

  const data = (await res.json()) as ReverseGeocodeResponse;
  return data;
}
