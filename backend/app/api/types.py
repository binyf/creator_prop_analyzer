from pydantic import BaseModel
from typing import List


class ChannelInfo(BaseModel):
    channel_id: str
    channel_name: str
    thumbnail: str


class ChannelResponse(BaseModel):
    channels: List[ChannelInfo]
