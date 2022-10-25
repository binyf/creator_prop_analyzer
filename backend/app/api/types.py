from pydantic import BaseModel
from typing import List


class ChannelInfo(BaseModel):
    channel_id: str
    channel_name: str
    description: str
    thumbnail: str


class ChannelStatistics(BaseModel):
    view_count: int
    sub_count: int
    vid_count: int
    banner_url: str


class ChannelResponse(BaseModel):
    channels: List[ChannelInfo]


class AnalyzedResponse(BaseModel):
    totalsum: dict
    comment_num: int
    top_C: List[list]
